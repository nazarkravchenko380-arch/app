"""Idempotent seed: demo community board entries (clearly marked) + submission counter."""

import asyncio
from datetime import datetime, timezone

from lib.db import db, ensure_indexes

DEMO_SUBMISSIONS = [
    {"type": "idea", "content": "A 'remember when' prompt that resurfaces a photo from this exact day, years ago.", "name": "Marta & Leo", "status": "exploring"},
    {"type": "date_idea", "content": "Recreate your first date — same order, same table if you can. Notice what's changed.", "name": None, "status": "planned"},
    {"type": "feature", "content": "A shared countdown for the trip we keep talking about but never plan.", "name": "Sofia", "status": "building"},
    {"type": "idea", "content": "Weekly one-question check-in that both partners answer before seeing each other's answer.", "name": "Dani & Alex", "status": "shipped"},
    {"type": "improvement", "content": "Let Signals carry a photo, not just two words. Sometimes a picture of the sky says it.", "name": None, "status": "exploring"},
    {"type": "story", "content": "We were long distance for 14 months. AMO NOW was the only part of the day that felt shared.", "name": "R & J", "status": "shipped"},
]


async def main() -> None:
    if await db.counters.count_documents({"_id": "submissions"}) == 0:
        await db.counters.insert_one({"_id": "submissions", "seq": 183})
    if await db.submissions.count_documents({}) == 0:
        import uuid

        now = datetime.now(timezone.utc)
        docs = [
            {
                "id": str(uuid.uuid4()),
                "number": 170 + i,
                "type": d["type"],
                "content": d["content"],
                "name": d["name"],
                "public": True,
                "status": d["status"],
                "demo": True,
                "created_at": now,
            }
            for i, d in enumerate(DEMO_SUBMISSIONS)
        ]
        await db.submissions.insert_many(docs)
        await ensure_indexes()  # inserting before indexes exist is fine; ensure after
    print("seed complete")


if __name__ == "__main__":
    asyncio.run(main())
