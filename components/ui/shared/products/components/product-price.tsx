function ProductPrice({ value }: { value: number }) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <span className="text-sm text-muted-foreground">
      {formatCurrency(value)}
    </span>
  );
}

export default ProductPrice;
