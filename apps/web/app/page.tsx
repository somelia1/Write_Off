'use client';
import { useState, useEffect, FormEvent } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { PlusCircle, DollarSign, FileText, Camera, PieChart } from 'lucide-react';

export default function MobileMVP() {
  const [screen, setScreen] = useState<'dashboard' | 'income' | 'expenses' | 'taxes' | 'incomeHistory' | 'expenseHistory'>('dashboard');

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', background: '#F9FAFB' }}>
      <div style={{ padding: 16, background: '#4F46E5', color: 'white', fontSize: 18, fontWeight: 600 }}>
        CashFirst
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {screen === 'dashboard' && <Dashboard setScreen={setScreen} />}
        {screen === 'income' && <IncomeFlow setScreen={setScreen} />}
        {screen === 'expenses' && <ExpenseFlow setScreen={setScreen} />}
        {screen === 'taxes' && <TaxesView setScreen={setScreen} />}
        {screen === 'incomeHistory' && <IncomeHistory setScreen={setScreen} />}
        {screen === 'expenseHistory' && <ExpenseHistory setScreen={setScreen} />}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', background: 'white', borderTop: '1px solid #E5E7EB', padding: 8 }}>
        <NavButton icon={<PieChart size={18} />} label="Dashboard" onClick={() => setScreen('dashboard')} />
        <NavButton icon={<DollarSign size={18} />} label="Income" onClick={() => setScreen('income')} />
        <NavButton icon={<Camera size={18} />} label="Expenses" onClick={() => setScreen('expenses')} />
        <NavButton icon={<FileText size={18} />} label="Taxes" onClick={() => setScreen('taxes')} />
      </div>
    </div>
  );
}

function NavButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#4B5563' }}>
      {icon}
      <span style={{ fontSize: 12, marginTop: 4 }}>{label}</span>
    </button>
  );
}

function Dashboard({ setScreen }: { setScreen: (s: any) => void }) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        <StatCard title="Income" value="$12,430" />
        <StatCard title="Expenses" value="$5,220" />
        <StatCard title="Potential Tax Savings" value="$1,780" />
        <StatCard title="Deductible %" value="34%" />
      </div>

      <Button className="w-full" onClick={() => setScreen('income')}>
        <span style={{ display: 'inline-flex', alignItems: 'center' }}><PlusCircle style={{ marginRight: 8 }} size={16}/> Add Income</span>
      </Button>
      <Button className="w-full" variant="outline" onClick={() => setScreen('expenses')}>
        <span style={{ display: 'inline-flex', alignItems: 'center' }}><Camera style={{ marginRight: 8 }} size={16}/> Add Expense</span>
      </Button>
    </div>
  );
}

function StatCard({ title, value }: { title: string, value: string }) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-4">
        <p style={{ fontSize: 12, color: '#6B7280' }}>{title}</p>
        <p style={{ fontSize: 20, fontWeight: 700 }}>{value}</p>
      </CardContent>
    </Card>
  );
}

function IncomeFlow({ setScreen }: { setScreen: (s: any) => void }) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h2 style={{ fontSize: 18, fontWeight: 600 }}>Add Income</h2>
      <Button className="w-full">Cash / Tip Entry</Button>
      <Button className="w-full" variant="outline">Deposit Check (Scan)</Button>
      <Button className="w-full" variant="outline">Import from Bank</Button>
      <Button className="w-full" onClick={() => setScreen('incomeHistory')}>View Income History</Button>
      <Button className="w-full" variant="ghost" onClick={() => setScreen('dashboard')}>Back to Dashboard</Button>
    </div>
  );
}

function ExpenseFlow({ setScreen }: { setScreen: (s: any) => void }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const newExpense = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      amount: parseFloat(amount).toFixed(2),
      description,
      imageUrl: URL.createObjectURL(file),
    };
    const existing = JSON.parse(localStorage.getItem('expenses') || '[]');
    existing.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(existing));
    setAmount('');
    setDescription('');
    setFile(null);
    setScreen('expenseHistory');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
      <h2 style={{ fontSize: 18, fontWeight: 600 }}>Add Expense</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: 8, borderRadius: 8, border: '1px solid #D1D5DB' }}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ padding: 8, borderRadius: 8, border: '1px solid #D1D5DB' }}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        style={{ padding: 8, borderRadius: 8, border: '1px solid #D1D5DB' }}
        required
      />
      <Button className="w-full" type="submit" disabled={!file}>
        Save Expense
      </Button>
      <Button className="w-full" variant="ghost" onClick={() => setScreen('dashboard')}>
        Back to Dashboard
      </Button>
    </form>
  );
}

function TaxesView({ setScreen }: { setScreen: (s: any) => void }) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h2 style={{ fontSize: 18, fontWeight: 600 }}>Taxes Overview</h2>
      <Card className="rounded-2xl">
        <CardContent className="p-4">
          <p style={{ fontSize: 12, color: '#6B7280' }}>Year-to-Date Summary</p>
          <p style={{ fontSize: 20, fontWeight: 700 }}>Est. Refund: $1,200</p>
        </CardContent>
      </Card>
      <div style={{ display: 'grid', gap: 4 }}>
        <p style={{ fontSize: 14, fontWeight: 600 }}>Possible Write-Offs</p>
        <ul style={{ margin: 0, paddingLeft: 16, color: '#374151' }}>
          <li>Uniforms — $300</li>
          <li>Supplies — $500</li>
          <li>Travel/Mileage — $400</li>
        </ul>
      </div>
      <Button className="w-full">Export Tax Package</Button>
      <Button className="w-full" variant="ghost" onClick={() => setScreen('dashboard')}>Back to Dashboard</Button>
    </div>
  );
}

function IncomeHistory({ setScreen }: { setScreen: (s: any) => void }) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h2 style={{ fontSize: 18, fontWeight: 600 }}>Income History</h2>
      <ul style={{ display: 'grid', gap: 8 }}>
        <li style={{ padding: 12, background: 'white', borderRadius: 12, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>08/19 — $120 (Cash Tip)</li>
        <li style={{ padding: 12, background: 'white', borderRadius: 12, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>08/18 — $250 (Check)</li>
        <li style={{ padding: 12, background: 'white', borderRadius: 12, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>08/15 — $80 (Cash Tip)</li>
      </ul>
      <Button className="w-full" variant="ghost" onClick={() => setScreen('income')}>Back</Button>
    </div>
  );
}

function ExpenseHistory({ setScreen }: { setScreen: (s: any) => void }) {
  const [expenses, setExpenses] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('expenses') || '[]');
    setExpenses(stored);
  }, []);

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h2 style={{ fontSize: 18, fontWeight: 600 }}>Expense History</h2>
      <ul style={{ display: 'grid', gap: 8, margin: 0, padding: 0 }}>
        {expenses.map((exp) => (
          <li
            key={exp.id}
            style={{
              padding: 12,
              background: 'white',
              borderRadius: 12,
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}
          >
            <p style={{ margin: 0 }}>
              {exp.date} — ${exp.amount} ({exp.description})
            </p>
            {exp.imageUrl && (
              <img
                src={exp.imageUrl}
                alt="receipt"
                style={{
                  marginTop: 8,
                  maxHeight: 120,
                  objectFit: 'contain',
                  width: '100%',
                }}
              />
            )}
          </li>
        ))}
        {expenses.length === 0 && (
          <li style={{ color: '#6B7280' }}>No expenses logged.</li>
        )}
      </ul>
      <Button className="w-full" variant="ghost" onClick={() => setScreen('expenses')}>
        Back
      </Button>
    </div>
  );
}
