import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import type { Poll } from "../../types/poll";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (poll: Poll) => Promise<void> | void;
}

export default function CreatePollModal({
  open,
  onClose,
  onCreate,
}: Props) {
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateOption = (index: number, value: string) => {
    const copy = [...options];
    copy[index] = value;
    setOptions(copy);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length <= 2) return;
    setOptions(options.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setExpiresAt("");
    setOptions(["", ""]);
  };

  const handleCreate = async () => {
    if (isSubmitting) return;

    if (!title || !description || !expiresAt) {
      toast({
        title: "Missing Information",
        description: "Please fill all fields.",
        variant: "warning",
      });
      return;
    }

    const validOptions = options.filter((o) => o.trim() !== "");
    if (validOptions.length < 2) {
      toast({
        title: "Need Options",
        description: "Add at least two poll options.",
        variant: "warning",
      });
      return;
    }

    const poll: Poll = {
      id: Date.now().toString(),
      title,
      description,
      createdBy: "Club Lead",
      expiresAt,
      isActive: true,
      options: validOptions.map((text, index) => ({
        id: (index + 1).toString(),
        text,
        votes: 0,
      })),
    };

    setIsSubmitting(true);

    try {
      await onCreate(poll);
      resetForm();
      onClose();
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: error instanceof Error ? error.message : "Unable to create poll.",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create New Poll"
      description="Gather feedback or vote on club decisions"
      size="md"
    >
      <div className="space-y-4">
        <div>
          <label className="label-base">Poll Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Preferred Weekly Meeting Day"
            className="input-base w-full"
          />
        </div>

        <div>
          <label className="label-base">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="Provide context or instructions for voters..."
            className="input-base w-full resize-none"
          />
        </div>

        <div>
          <label className="label-base">Expires At</label>
          <input
            type="date"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className="input-base w-full"
          />
        </div>

        <div>
          <label className="label-base">Poll Options</label>
          <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
            {options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <input
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="input-base flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  disabled={options.length <= 2}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-danger/10 bg-danger/5 text-danger transition-colors hover:bg-danger/10 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addOption}
            className="mt-3 flex items-center gap-1.5 rounded-lg border border-border-soft px-3 py-1.5 text-xs font-bold text-navy hover:bg-navy/5"
          >
            <Plus size={14} /> Add Option
          </button>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleCreate} leftIcon="Check" loading={isSubmitting}>
            Create Poll
          </Button>
        </div>
      </div>
    </Modal>
  );
}
