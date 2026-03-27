import { CreditCard, Download, CheckCircle2, Clock } from "lucide-react";

export default function PaymentsPage() {
  const payments = [
    { id: "1", trip: "Bush & Beach Retreat", amount: "$930", type: "Deposit (30%)", status: "completed", date: "Mar 10, 2026", method: "Paystack" },
    { id: "2", trip: "Bush & Beach Retreat", amount: "$2,170", type: "Final Payment", status: "pending", date: "Jul 15, 2026", method: "—" },
    { id: "3", trip: "Cultural Immersion Tour", amount: "$660", type: "Deposit (30%)", status: "completed", date: "Mar 20, 2026", method: "Paystack" },
  ];

  const totalPaid = "$1,590";
  const totalPending = "$2,170";

  return (
    <div>
      <h1 className="text-3xl font-bold font-playfair mb-2">Payments</h1>
      <p className="text-muted-foreground mb-8">View your payment history and upcoming balances.</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Paid</p>
              <p className="text-xl font-bold text-green-700">{totalPaid}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pending</p>
              <p className="text-xl font-bold text-orange-700">{totalPending}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Payment Method</p>
              <p className="text-sm font-bold">Paystack</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
        <div className="hidden md:grid grid-cols-6 gap-4 p-4 border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          <div className="col-span-2">Trip</div>
          <div>Amount</div>
          <div>Type</div>
          <div>Date</div>
          <div className="text-right">Status</div>
        </div>
        <div className="divide-y">
          {payments.map(payment => (
            <div key={payment.id} className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-4 p-4 items-center hover:bg-muted/30 transition-colors">
              <div className="col-span-2 font-semibold text-sm">{payment.trip}</div>
              <div className="text-sm font-bold">{payment.amount}</div>
              <div className="text-sm text-muted-foreground">{payment.type}</div>
              <div className="text-sm text-muted-foreground">{payment.date}</div>
              <div className="text-right">
                {payment.status === "completed" ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    <CheckCircle2 className="h-3 w-3" /> Paid
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
                    <Clock className="h-3 w-3" /> Due
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
