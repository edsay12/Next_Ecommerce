function ProductPrice({ value }: { value: number }) {
  const formatCurrency = (value: number) => {
    const valor = typeof value === "number" ? value : Number(value);
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  
  return (
    <span className="text-sm text-muted-foreground text-black ">
      {formatCurrency(value) }
    </span>
  );
}

export default ProductPrice;
