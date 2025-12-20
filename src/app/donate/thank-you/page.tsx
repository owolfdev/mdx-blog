// Utility function to extract the first value from a string or array
function getFirstValue(param: string | string[] | undefined): string {
  return Array.isArray(param) ? param[0] : param || "";
}

const ThankYouPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;

  // Extract values from the URL parameters
  const paymentStatus = getFirstValue(params.payment) || "unknown";
  const clientName = getFirstValue(params.client) || "Customer";
  const amount = getFirstValue(params.amount) || "0.00";

  return (
    <section className="site-container py-16 md:py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          MDXBlog
        </span>
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
          Thank You!
        </h1>
        <p className="text-base font-medium text-muted-foreground sm:text-lg">
          Your donation is appreciated!
        </p>
        <div className="grid w-full max-w-md gap-2 border border-border bg-card p-6 text-sm">
          <p>{`Payment Status: ${paymentStatus}`}</p>
          <p>{`Client: ${clientName}`}</p>
          <p>{`Amount Paid: $${amount}`}</p>
        </div>
      </div>
    </section>
  );
};

export default ThankYouPage;
