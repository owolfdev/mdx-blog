export function HomeForAgencies() {
  return (
    <section className="site-container py-16 md:py-24">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 text-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            For Agencies
          </h2>
          <p className="text-base font-medium text-foreground/70 sm:text-lg">
            Useful for product studios, SaaS agencies, and engineering-led teams
            that ship content-heavy sites.
          </p>
        </div>
        <div className="grid gap-6 text-left md:grid-cols-3">
          <div className="border border-border bg-card p-6">
            <h3 className="text-lg font-bold">Who It&apos;s For</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Teams delivering content sites as part of scoped client work.
            </p>
          </div>
          <div className="border border-border bg-card p-6">
            <h3 className="text-lg font-bold">Typical Use Cases</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Marketing sites, docs + blog setups, and CMS replacements.
            </p>
          </div>
          <div className="border border-border bg-card p-6">
            <h3 className="text-lg font-bold">Delivery Model</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Delivered as fixed-scope work, adapted per project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
