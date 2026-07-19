import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  User as UserIcon,
  Lock,
} from "lucide-react";

import { AuthLayout } from "../../layouts/AuthLayout";
import type { Role } from "../../types";
import { Input, PasswordInput } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Checkbox } from "../../components/ui/Checkbox";
import { Dropdown } from "../../components/ui/Dropdown";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

import {
  DEPARTMENTS,
  YEARS,
  APP_NAME,
} from "../../utils/constants";

import { passwordStrength } from "../../utils/cn";

const step1Schema = z.object({
  name: z
    .string()
    .min(2, "Enter your full name"),

  email: z
    .string()
    .email("Enter a valid email"),

  department: z
    .string()
    .min(1, "Select a department"),

  year: z
    .string()
    .min(1, "Select your year"),
});

const step2Schema = z.object({
  password: z
    .string()
    .min(8, "Minimum 8 characters")
    .regex(/[A-Z]/, "Add an uppercase letter")
    .regex(/[0-9]/, "Add a number"),

  confirmPassword: z
    .string(),

  terms: z
    .boolean()
    .refine((v) => v, "Accept Terms & Conditions"),

}).refine(
  (data) =>
    data.password ===
    data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);

type Step1 = z.infer<
  typeof step1Schema
>;

type Step2 = z.infer<
  typeof step2Schema
>;

const steps = [
  {
    id: 1,
    label: "About You",
    icon: UserIcon,
  },
  {
    id: 2,
    label: "Security",
    icon: Lock,
  },
  {
    id: 3,
    label: "Done",
    icon: Check,
  },
];

export default function SignupPage({ role = "member" }: { role?: Role }) {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Partial<Step1>>({});

  const s1 = useForm<Step1>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name: "",
      email: "",
      department: "",
      year: "",
    },
  });

  const s2 = useForm<Step2>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const pw = s2.watch("password") ?? "";
  const strength = passwordStrength(pw);

  const onStep1 = (values: Step1) => {
    setData(values);
    setStep(2);
  };

  const onStep2 = async (values: Step2) => {
    setLoading(true);

    if (!values.terms) {
      toast({
        title: "Terms Required",
        description: "Please accept the Terms & Privacy Policy.",
        variant: "warning",
      });
      setLoading(false);
      return;
    }

    try {
      await registerUser({
        name: data.name!,
        email: data.email!,
        department: data.department!,
        year: data.year!,
        password: values.password,
        role,
      });

      setStep(3);

      toast({
        title: "Account Created 🎉",
        description: "Welcome to CampusOS! Your account has been created successfully.",
        variant: "success",
      });

      setTimeout(() => {
        navigate(`/login/${role}`);
      }, 1600);

    } catch (error: any) {
      let message = "Unable to create account.";

      switch (error.code) {
        case "auth/email-already-in-use":
          message = "An account already exists with this email.";
          break;

        case "auth/invalid-email":
          message = "Please enter a valid email.";
          break;

        case "auth/weak-password":
          message = "Password should be at least 8 characters.";
          break;

        case "auth/network-request-failed":
          message = "Network error. Check your internet connection.";
          break;

        default:
          message = error.message || message;
      }

      toast({
        title: "Registration Failed",
        description: message,
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      role={role}
      title="Create your CampusOS account"
      subtitle={`Join ${APP_NAME} in under a minute.`}
    >
      {/* Progress */}
      <div className="mb-7 flex items-center gap-2">
        {steps.map((s, i) => {
          const done = step > s.id;
          const active = step === s.id;

          return (
            <div key={s.id} className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{
                    scale: active ? 1.08 : 1,
                    backgroundColor: done || active ? "#19376D" : "#E7E0D7",
                    color: done || active ? "#fff" : "#6B7280",
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                >
                  {done ? (
                    <Check
                      className="h-4 w-4"
                      strokeWidth={3}
                    />
                  ) : (
                    s.id
                  )}
                </motion.div>

                <span
                  className={`hidden text-xs font-medium sm:block ${
                    active ? "text-navy" : "text-ink-soft"
                  }`}
                >
                  {s.label}
                </span>
              </div>

              {i < steps.length - 1 && (
                <div className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-border-soft">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-navy"
                    animate={{
                      width: step > s.id ? "100%" : "0%",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.form
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={s1.handleSubmit(onStep1)}
            className="space-y-4"
          >
            <Input
              label="Full Name"
              placeholder="Your Full Name"
              error={s1.formState.errors.name?.message}
              {...s1.register("name")}
            />

            <Input
              label="Email"
              type="email"
              leftIcon="Mail"
              placeholder="you@campusos.app"
              error={s1.formState.errors.email?.message}
              {...s1.register("email")}
            />

            <div>
              <label className="mb-1.5 block text-[0.825rem] font-semibold text-ink">
                Department
              </label>

              <Dropdown
                value={s1.watch("department") ?? ""}
                options={DEPARTMENTS.map((d) => ({
                  value: d,
                  label: d,
                }))}
                onChange={(v) =>
                  s1.setValue("department", v, { shouldValidate: true })
                }
                placeholder="Select Department"
              />
              {s1.formState.errors.department && (
                <p className="mt-1 text-xs text-red-500">
                  {s1.formState.errors.department.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-[0.825rem] font-semibold text-ink">
                Year
              </label>

              <Dropdown
                value={s1.watch("year") ?? ""}
                options={YEARS.map((y) => ({
                  value: y,
                  label: y,
                }))}
                onChange={(v) =>
                  s1.setValue("year", v, { shouldValidate: true })
                }
                placeholder="Select Year"
              />
              {s1.formState.errors.year && (
                <p className="mt-1 text-xs text-red-500">
                  {s1.formState.errors.year.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              rightIcon="ArrowRight"
              magnetic
            >
              Continue
            </Button>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={s2.handleSubmit(onStep2)}
            className="space-y-4"
          >
            <PasswordInput
              label="Password"
              leftIcon="Lock"
              placeholder="Create Password"
              strength
              strengthScore={strength.score}
              strengthLabel={strength.label}
              strengthColor={strength.color}
              error={s2.formState.errors.password?.message}
              {...s2.register("password")}
            />

            <PasswordInput
              label="Confirm Password"
              leftIcon="Lock"
              placeholder="Confirm Password"
              error={s2.formState.errors.confirmPassword?.message}
              {...s2.register("confirmPassword")}
            />

            <Checkbox
              checked={s2.watch("terms")}
              onChange={(v) =>
                s2.setValue("terms", v, {
                  shouldValidate: true,
                })
              }
              label="I agree to the Terms & Privacy Policy"
            />
            {s2.formState.errors.terms && (
              <p className="text-xs text-red-500">
                {s2.formState.errors.terms.message}
              </p>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setStep(1)}
              >
                Back
              </Button>

              <Button
                type="submit"
                loading={loading}
                disabled={!s2.watch("terms")}
                className="flex-1"
              >
                {loading ? "Creating..." : "Create Account"}
              </Button>
            </div>
          </motion.form>
        )}

        {step === 3 && (
          <motion.div
            key="done"
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="py-8 text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
              <Check
                className="h-8 w-8 text-success"
                strokeWidth={3}
              />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Account Created!
            </h2>

            <p className="mt-2 text-sm text-ink-soft">
              Redirecting you to Login...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Already have an account?{" "}
        <Link
          to={`/login/${role}`}
          className="font-semibold text-navy hover:underline"
        >
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}
