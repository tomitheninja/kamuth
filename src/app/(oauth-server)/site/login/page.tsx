import { ProfileForm } from "./profile-form";
import { v4 as uuid } from "uuid";

export const dynamic = "force-dynamic";

export default function Page() {
  const internal_id = uuid();

  return (
    <main className="w-full h-full flex items-center justify-center">
      <div className="bg-stone-50 md:m-10">
        <ProfileForm defaultInternalId={internal_id} />
      </div>
    </main>
  );
}
