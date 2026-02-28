import React from 'react';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-100">About</h1>
        <p className="mt-3 text-slate-300">
          Building clean digital products with strong UX and reliable engineering.
        </p>
      </header>

      <section className="grid gap-6">
        <div className="rounded-2xl border border-blue-200/15 bg-blue-950/30 p-6">
          <h2 className="text-2xl font-semibold text-slate-100 mb-3">Our Story</h2>
          <p className="text-slate-300 leading-relaxed">
            We are dedicated to creating exceptional digital experiences and delivering high-quality
            solutions to clients and teams.
          </p>
        </div>

        <div className="rounded-2xl border border-blue-200/15 bg-blue-950/30 p-6">
          <h2 className="text-2xl font-semibold text-slate-100 mb-3">Our Mission</h2>
          <p className="text-slate-300 leading-relaxed">
            Empowering businesses through modern technology and design systems that scale.
          </p>
        </div>

        <div className="rounded-2xl border border-blue-200/15 bg-blue-950/30 p-6">
          <h2 className="text-2xl font-semibold text-slate-100 mb-3">Our Values</h2>
          <ul className="grid gap-2 text-slate-300 list-disc pl-5">
            <li>Excellence</li>
            <li>Innovation</li>
            <li>Integrity</li>
            <li>Collaboration</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
