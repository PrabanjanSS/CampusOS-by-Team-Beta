import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { ArrowLeft, CheckCircle } from "lucide-react";

import { auth } from "../../firebase";
import { AuthLayout } from "../../layouts/AuthLayout";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useToast } from "../../context/ToastContext";

export default function ForgotPassword() {
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!email.trim()) {
      toast({
        title: "Missing Email",
        description: "Please enter your email address.",
        variant: "warning",
      });
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);

      setSent(true);

      toast({
        title: "Reset Email Sent",
        description:
          "Check your inbox for password reset instructions.",
        variant: "success",
      });
    } catch (error: any) {
      let message = "Something went wrong.";

      switch (error.code) {
        case "auth/user-not-found":
          message = "No account exists with this email.";
          break;

        case "auth/invalid-email":
          message = "Please enter a valid email address.";
          break;

        case "auth/network-request-failed":
          message =
            "Network error. Please check your internet connection.";
          break;

        default:
          message = error.message;
      }

      toast({
        title: "Reset Failed",
        description: message,
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      role="member"
      title="Forgot Password"
      subtitle="Enter your registered email to receive a password reset link."
    >
      {sent ? (
        <div className="text-center">

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">

            <CheckCircle
              className="h-10 w-10 text-green-600"
            />

          </div>

          <h2 className="text-2xl font-bold text-slate-800">
            Email Sent
          </h2>

          <p className="mt-3 text-slate-500">
            We've sent a password reset link to
          </p>

          <p className="font-semibold text-slate-700">
            {email}
          </p>

          <Link to="/login">
            <Button
              className="mt-8 w-full"
              size="lg"
            >
              Back to Login
            </Button>
          </Link>

        </div>
      ) : (
        <form
          onSubmit={handleReset}
          className="space-y-5"
        >

          <Input
            label="Email Address"
            type="email"
            leftIcon="Mail"
            placeholder="you@example.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <Button
            type="submit"
            className="w-full"
            size="lg"
            loading={loading}
          >
            {loading
              ? "Sending Reset Link..."
              : "Send Reset Link"}
          </Button>

          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-sm font-medium text-navy hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>

        </form>
      )}
    </AuthLayout>
  );
}
