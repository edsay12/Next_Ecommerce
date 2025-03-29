export type Step = {
  title: string;
};

const steps = [
  { title: "Login" },
  { title: "Endereço de entrega" },
  { title: "Método de pagamento" },
  { title: "Confirmação" },
];

function CheckoutSteps({ currentStep = 0 }: { currentStep: number }) {
  return (
    <div className=" w-full ">
      <div className="flex justify-between space-x-2 w-full mb-10">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`p-2 w-56 text-center text-sm font-medium rounded-full ${
              index === currentStep ? "bg-gray-200" : ""
            }`}
          >
            {step.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CheckoutSteps;
