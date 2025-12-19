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
    <div className="max-w-lg mx-auto py-10 text-center flex flex-col items-center justify-center gap-4 text-lg">
      <div className="flex flex-col items-center justify-center mb-4">
        <h1 className="text-6xl font-black mb-2">Thank You!</h1>
        <p className="text-md">Your donation is appreciated!</p>
      </div>
      <p>{`Payment Status: ${paymentStatus}`}</p>
      <p>{`Client: ${clientName}`}</p>
      <p>{`Amount Paid: $${amount}`}</p>
    </div>
  );
};

export default ThankYouPage;
