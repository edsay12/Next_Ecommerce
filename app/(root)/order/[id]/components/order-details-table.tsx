import { InsertOrderItem } from "@/@types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CurencyFormat, formatDate, shortenUuid } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

function OrderDetailsTable({ order }: { order: InsertOrderItem }) {
  const {
    shippingAddress,
    id,
    isDelivered,
    paidAt,
    deliveredAt,
    isPaid,
    OrderItem,
    itemsPrice,
    totalPrice,
    shipingPrice,
    taxPrice,
  } = order;
  return (
    <div>
      <h1 className="py-4 text-2xl font-bold">Order {shortenUuid(id)}</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="col-span-2 space-y-4 overflow-auto">
          <Card className="my-2">
            <CardContent className="p-4 space-y-4">
              <h2 className="text-xl pb-4">Metodo de pagamento</h2>
              <p>{order.paymentMethod}</p>
              {isPaid ? (
                <Badge variant="secondary">
                  Pago em {formatDate(paidAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive">Não pago</Badge>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="text-xl pb-4">Shipping Adress</h2>
              <p>{shippingAddress.fullName}</p>
              <p>
                {shippingAddress.streetAddress} , {shippingAddress.city}
                {shippingAddress.postalCode} , {shippingAddress.country}
              </p>

              {isDelivered ? (
                <Badge variant="secondary">
                  Enviado em {formatDate(deliveredAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive">Não enviado</Badge>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Itens</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Preço</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {OrderItem.map((item) => (
                    <TableRow key={item.productId}>
                      <TableCell>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            width={50}
                            height={50}
                            alt={item.name}
                          ></Image>
                          <span className="ml-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>{item.qty}</TableCell>
                      <TableCell>
                        {CurencyFormat(item.price.toString())}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-4 gap-4">
              <div className="flex justify-between">
                <h2 className="text-xl pb-4">Items: </h2>
                <p>{CurencyFormat(Number(itemsPrice))}</p>
              </div>
              <div className="flex justify-between">
                <h2 className="text-xl pb-4">Taxa: </h2>
                <p>{CurencyFormat(Number(taxPrice))}</p>
              </div>
              <div className="flex justify-between">
                <h2 className="text-xl pb-4">Frete: </h2>
                <p>{CurencyFormat(Number(shipingPrice))}</p>
              </div>
              <div className="flex justify-between">
                <h2 className="text-xl pb-4">Total: </h2>
                <p>{CurencyFormat(Number(totalPrice))}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsTable;
