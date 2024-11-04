import InvoiceForm from "../../components/InvoiceForm/InvoiceForm";

const Invoice = () => {
    const fakeOrder = {
        OrderId: '12345',
        UserId: 'user-001',
        OrderDate: '2024-11-01T10:30:00Z',
        TotalPrice: 150.75,
        Address: '123 Main St, Springfield, USA',
        Phone: '555-1234',
    };

    const fakeOrderItems = [
        {
            ProductId: 'prod-001',
            ProductName: 'Widget A',
            Quantity: 2,
            UnitPrice: 25.00,
        },
        {
            ProductId: 'prod-002',
            ProductName: 'Widget B',
            Quantity: 1,
            UnitPrice: 50.00,
        },
        {
            ProductId: 'prod-003',
            ProductName: 'Widget C',
            Quantity: 3,
            UnitPrice: 15.25,
        },
    ];

    return <div>
      <InvoiceForm 
                order={fakeOrder} 
                userId={fakeOrder.UserId} 
                orderItems={fakeOrderItems} 
            />
      </div>;
  };
  
  export default Invoice;
