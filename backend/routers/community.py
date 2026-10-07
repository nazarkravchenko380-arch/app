import uuid
from datetime import datetime, timezone
from typing import List, Literal, Optional

from fastapi import APIRouter
from pydantic import BaseModel, EmailStr, Field
from pymongo import ReturnDocument

from lib.db import db

router = APIRouter(prefix="/community", tags=["community"])

SubmissionType = Literal["idea", "date_idea", "feature", "improvement", "feedback", "bug", "story"]
SubmissionStatus = Literal["new", "exploring", "planned", "building", "shipped"]


class SubmissionCreate(BaseModel):
    type: SubmissionType
    content: str = Field(min_length=3, max_length=2000)
    name: Optional[str] = Field(default=None, max_length=80)
    email: Optional[EmailStr] = None
    public: bool = False


class Submission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    number: int = 0
    type: SubmissionType
    content: str
    name: Optional[str] = None
    public: bool = False
    status: SubmissionStatus = "new"
    demo: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class PublicSubmission(BaseModel):
    """Board payload — never carries email or other private contact fields."""

    id: str
    number: int
    type: SubmissionType
    content: str
    name: Optional[str] = None
    status: SubmissionStatus
    demo: bool = False
    created_at: datetime


class CommunityStats(BaseModel):
    submitted: int
    exploring: int
    planned: int
    building: int
    shipped: int
    demo: bool = True  # stays true until real production data replaces seeded entries


class Review(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    quote: str
    first_names: Optional[str] = None
    place: Optional[str] = None
    relationship_duration: Optional[str] = None
    approved: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


async def _next_number() -> int:
    doc = await db.counters.find_one_and_update(
        {"_id": "submissions"},
        {"$inc": {"seq": 1}},
        upsert=True,
        return_document=ReturnDocument.AFTER,
    )
    return int(doc["seq"])


@router.post("/submissions", response_model=Submission, status_code=201)
async def create_submission(input: SubmissionCreate):
    submission = Submission(**input.model_dump(), number=await _next_number())
    await db.submissions.insert_one(submission.model_dump())
    return submission


@router.get("/board", response_model=List[PublicSubmission])
async def get_board(status: Optional[SubmissionStatus] = None):
    query: dict = {"public": True}
    if status:
        query["status"] = status
    docs = await db.submissions.find(query, {"email": 0, "_id": 0}).sort("created_at", -1).to_list(200)
    return [PublicSubmission(**doc) for doc in docs]


@router.get("/stats", response_model=CommunityStats)
async def get_stats():
    pipeline = [{"$group": {"_id": "$status", "count": {"$sum": 1}}}]
    counts = {doc["_id"]: doc["count"] for doc in await db.submissions.aggregate(pipeline).to_list(10)}
    return CommunityStats(
        submitted=sum(counts.values()),
        exploring=counts.get("exploring", 0),
        planned=counts.get("planned", 0),
        building=counts.get("building", 0),
        shipped=counts.get("shipped", 0),
    )


@router.get("/reviews", response_model=List[Review])
async def get_reviews():
    # Only moderated, approved reviews are ever exposed. Seeded with nothing on purpose:
    # AMO never fabricates reviews — this endpoint is ready for real voices.
    docs = await db.reviews.find({"approved": True}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return [Review(**doc) for doc in docs]
