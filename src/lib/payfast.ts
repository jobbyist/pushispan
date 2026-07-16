import crypto from "crypto";

interface PayfastConfig {
  merchantId: string;
  merchantKey: string;
  passphrase: string;
  isTestMode: boolean;
}

interface PaymentData {
  amount: number;
  item_name: string;
  item_description?: string;
  email_address: string;
  name_first?: string;
  name_last?: string;
  custom_str1?: string;
  subscription_type?: 1 | 2; // 1 = Subscription, 2 = Ad Hoc
  billing_date?: string;
  recurring_amount?: number;
  frequency?: 3 | 4 | 5 | 6; // 3 = Monthly, 4 = Quarterly, 5 = Biannual, 6 = Annual
  cycles?: number;
}

export class PayfastService {
  private config: PayfastConfig;
  private baseUrl: string;

  constructor(config: PayfastConfig) {
    this.config = config;
    this.baseUrl = config.isTestMode
      ? "https://sandbox.payfast.co.za/eng/process"
      : "https://www.payfast.co.za/eng/process";
  }

  generateSignature(data: Record<string, string | number>): string {
    // Create parameter string
    const paramString = Object.keys(data)
      .sort()
      .map((key) => `${key}=${encodeURIComponent(data[key].toString().trim())}`)
      .join("&");

    // Add passphrase if set
    const withPassphrase = this.config.passphrase
      ? `${paramString}&passphrase=${encodeURIComponent(this.config.passphrase.trim())}`
      : paramString;

    // Generate signature
    return crypto.createHash("md5").update(withPassphrase).digest("hex");
  }

  createPaymentData(payment: PaymentData) {
    const data: Record<string, string | number> = {
      merchant_id: this.config.merchantId,
      merchant_key: this.config.merchantKey,
      return_url: `${process.env.VITE_APP_URL || "http://localhost:5173"}/dashboard/billing?success=true`,
      cancel_url: `${process.env.VITE_APP_URL || "http://localhost:5173"}/dashboard/billing?cancelled=true`,
      notify_url: `${process.env.VITE_APP_URL || "http://localhost:5173"}/api/payments/webhook`,
      amount: payment.amount.toFixed(2),
      item_name: payment.item_name,
    };

    if (payment.item_description) data.item_description = payment.item_description;
    if (payment.email_address) data.email_address = payment.email_address;
    if (payment.name_first) data.name_first = payment.name_first;
    if (payment.name_last) data.name_last = payment.name_last;
    if (payment.custom_str1) data.custom_str1 = payment.custom_str1;
    if (payment.subscription_type) data.subscription_type = payment.subscription_type;
    if (payment.billing_date) data.billing_date = payment.billing_date;
    if (payment.recurring_amount) data.recurring_amount = payment.recurring_amount.toFixed(2);
    if (payment.frequency) data.frequency = payment.frequency;
    if (payment.cycles) data.cycles = payment.cycles;

    const signature = this.generateSignature(data);
    
    return { ...data, signature, url: this.baseUrl };
  }
}
