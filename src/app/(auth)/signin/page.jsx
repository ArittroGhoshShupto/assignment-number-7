import { Suspense } from "react";
import Shell from "../../../components/Shell";
import SignInForm from "../../../components/SignInForm";

export default function SignInPage() {
  return (
    <Shell>
      <Suspense>
        <SignInForm />
      </Suspense>
    </Shell>
  );
}