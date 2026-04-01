import React from 'react';

type InlineLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function InlineLink({href, children}: InlineLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-medium text-slate-900 underline decoration-[#5C9E9A] decoration-2 underline-offset-4 transition-colors hover:text-[#5C9E9A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C9E9A] focus-visible:ring-offset-2 rounded-sm"
    >
      {children}
    </a>
  );
}
