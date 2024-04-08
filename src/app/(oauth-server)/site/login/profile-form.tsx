"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Profile } from "../../profile";

export function ProfileForm({
  defaultInternalId,
}: {
  defaultInternalId: string;
}) {
  const [redirectUri, setRedirectUri] = useState<string>("");
  const [displayName, setDisplayName] = useState("$DISPLAY_NAME");
  const [givenName, setGivenName] = useState("$GIVEN_NAME");
  const [internal_id, setInternalId] = useState(defaultInternalId);
  const [mail, setMail] = useState<string>(internal_id + "@example.com");

  function setDefaultRedirectUri() {
    const query = new URLSearchParams(window.location.search).get("client_id");
    setRedirectUri(query || "http://localhost:3000/auth/callback");
  }

  useEffect(setDefaultRedirectUri, []);

  const profile = new Profile({
    redirectUri,
    displayName,
    givenName,
    internal_id,
    mail,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = redirectUri + "?code=" + profile.serialize();
      }}
      className="md:p-12 p-2 w-screen md:w-full gap-4 flex flex-col"
    >
      <div>
        <h1 className="text-2xl">Please login!</h1>
      </div>
      <div className="flex flex-col gap-2 max-w-full md:min-w-96">
        {[
          {
            label: "Redirect",
            type: "url",
            value: redirectUri,
            onChange: setRedirectUri,
          },
          {
            label: "Display Name",
            value: displayName,
            onChange: setDisplayName,
          },
          {
            label: "Given Name",
            value: givenName,
            onChange: setGivenName,
          },
          {
            label: "Internal ID",
            value: internal_id,
            onChange: setInternalId,
          },
          {
            label: "Mail",
            value: mail,
            onChange: setMail,
          },
        ].map(({ label, type = "text", value, onChange }) => (
          <div key={label} className="flex flex-col">
            <label>{label}</label>
            <input
              type={type}
              className="p-2"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        ))}
        <Button
          variant="destructive"
          onClick={(e) => {
            e.preventDefault();
            setDefaultRedirectUri();
          }}
        >
          Reset redirect link
        </Button>
        <Button
          variant="destructive"
          onClick={(e) => {
            e.preventDefault();
            setInternalId(defaultInternalId);
          }}
        >
          Reset internal id
        </Button>
        <Button type="submit" variant="default">
          Login with kamusch
        </Button>
      </div>
    </form>
  );
}
