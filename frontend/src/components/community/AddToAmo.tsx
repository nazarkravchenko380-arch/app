import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { Heart, Lightbulb, CalendarHeart, Sparkles, Wrench, MessageCircle, Bug, BookHeart, Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitToAmo } from "@/lib/community";
import type { Submission, SubmissionType } from "@/lib/community";
import { AmoBears } from "@/components/AmoBears";

const OPTIONS: { type: SubmissionType; label: string; prompt: string; icon: typeof Lightbulb }[] = [
  { type: "idea", label: "Idea", prompt: "What's your idea?", icon: Lightbulb },
  { type: "date_idea", label: "Date idea", prompt: "Describe the date idea", icon: CalendarHeart },
  { type: "feature", label: "Feature", prompt: "What should AMO do?", icon: Sparkles },
  { type: "improvement", label: "Improvement", prompt: "What could be better?", icon: Wrench },
  { type: "feedback", label: "Feedback", prompt: "Tell us honestly", icon: MessageCircle },
  { type: "bug", label: "Bug", prompt: "What happened?", icon: Bug },
  { type: "story", label: "Our AMO story", prompt: "Tell us your story", icon: BookHeart },
];

interface AddToAmoContextValue {
  openSheet: (type?: SubmissionType) => void;
}

const AddToAmoContext = createContext<AddToAmoContextValue>({ openSheet: () => {} });
export const useAddToAmo = () => useContext(AddToAmoContext);

export function AddToAmoProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<SubmissionType | null>(null);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isPublic, setIsPublic] = useState<boolean | null>(null);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<Submission | null>(null);

  const openSheet = useCallback((t?: SubmissionType) => {
    setType(t ?? null);
    setContent("");
    setName("");
    setEmail("");
    setIsPublic(null);
    setResult(null);
    setOpen(true);
  }, []);

  const selected = OPTIONS.find((o) => o.type === type);
  const canSubmit = content.trim().length >= 3 && isPublic !== null && !sending;

  const submit = async () => {
    if (!type || !canSubmit) return;
    setSending(true);
    try {
      const res = await submitToAmo({
        type,
        content: content.trim(),
        name: name.trim() || undefined,
        email: email.trim() || undefined,
        public: isPublic === true,
      });
      setResult(res);
    } catch {
      toast.error("AMO is resting — your idea didn't send. Try again in a moment.");
    } finally {
      setSending(false);
    }
  };

  return (
    <AddToAmoContext.Provider value={{ openSheet }}>
      {children}

      <AnimatePresence>
        {!open && (
          <motion.button
            key="add-pill"
            data-testid="add-to-amo-button"
            onClick={() => openSheet()}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ delay: 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 flex items-center gap-2 rounded-full border border-crimson/40 bg-wine/70 px-5 py-2.5 font-mono text-xs tracking-[0.2em] uppercase text-crimson-soft backdrop-blur-xl transition-colors hover:bg-crimson hover:text-white"
          >
            <Heart className="h-3.5 w-3.5" fill="currentColor" />
            + Add to AMO
          </motion.button>
        )}
      </AnimatePresence>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          data-testid="add-to-amo-sheet"
          className="mx-auto max-w-xl rounded-t-3xl border-border bg-[#121215] px-6 pb-10 pt-4 text-bone"
        >
          <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-border" />
          {result ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center" data-testid="submission-success">
              <AmoBears size={64} />
              <p className="font-serif text-3xl sm:text-4xl text-bone">
                {selected?.label.toUpperCase()} RECEIVED. <span className="text-crimson">♥</span>
              </p>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-fog" data-testid="submission-number">
                IDEA #{result.number}
              </p>
              <p className="max-w-sm text-sm text-fog leading-relaxed">
                Thank you for paying attention to AMO. Real relationships shape what we build next.
              </p>
              <Button data-testid="submission-done-button" variant="outline" onClick={() => setOpen(false)} className="mt-2">
                Back to the story
              </Button>
            </div>
          ) : !selected ? (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="font-serif text-2xl text-bone">What do you want to add?</SheetTitle>
                <SheetDescription className="text-fog">AMO is built for real relationships — so real relationships should shape it.</SheetDescription>
              </SheetHeader>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {OPTIONS.map((o) => (
                  <button
                    key={o.type}
                    data-testid={`add-option-${o.type}`}
                    onClick={() => setType(o.type)}
                    className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-panel2/60 p-4 text-left transition-colors hover:border-crimson/60 hover:bg-wine/40"
                  >
                    <o.icon className="h-5 w-5 text-crimson-soft" />
                    <span className="text-sm font-medium text-bone">{o.label}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <SheetHeader className="mb-5">
                <SheetTitle className="font-serif text-2xl text-bone">{selected.prompt}</SheetTitle>
                <SheetDescription className="text-fog">
                  <button data-testid="add-back-button" onClick={() => setType(null)} className="font-mono text-xs uppercase tracking-[0.2em] text-crimson-soft hover:text-crimson">
                    ← Change type
                  </button>
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4">
                <Textarea
                  data-testid="submission-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={selected.prompt}
                  rows={4}
                  className="resize-none border-border bg-panel2/60 text-bone placeholder:text-fog/60"
                />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Input data-testid="submission-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name (optional)" className="border-border bg-panel2/60 text-bone placeholder:text-fog/60" />
                  <Input data-testid="submission-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (optional)" className="border-border bg-panel2/60 text-bone placeholder:text-fog/60" />
                </div>
                <div>
                  <p className="mb-2 text-sm text-fog">Can we share this publicly if we love it?</p>
                  <div className="flex gap-3">
                    <button
                      data-testid="visibility-yes"
                      onClick={() => setIsPublic(true)}
                      className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-[0.15em] transition-colors ${isPublic === true ? "border-crimson bg-crimson text-white" : "border-border text-fog hover:border-crimson/60"}`}
                    >
                      Yes
                    </button>
                    <button
                      data-testid="visibility-private"
                      onClick={() => setIsPublic(false)}
                      className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-[0.15em] transition-colors ${isPublic === false ? "border-crimson bg-crimson text-white" : "border-border text-fog hover:border-crimson/60"}`}
                    >
                      Keep it private
                    </button>
                  </div>
                </div>
                <Button data-testid="submission-submit" onClick={submit} disabled={!canSubmit} className="w-full bg-crimson text-white hover:bg-crimson/90 disabled:opacity-40">
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit"}
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </AddToAmoContext.Provider>
  );
}
