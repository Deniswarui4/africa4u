import { User, Mail, Shield, Smartphone } from "lucide-react";

export default function ProfileSettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-playfair mb-2">Profile Settings</h1>
      <p className="text-muted-foreground mb-8">Manage your personal information and account preferences.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* General Info Form */}
          <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-bold flex items-center gap-2"><User className="h-5 w-5" /> Personal Details</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <input type="text" defaultValue="John" className="w-full h-10 px-3 rounded-md border bg-transparent" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <input type="text" defaultValue="Doe" className="w-full h-10 px-3 rounded-md border bg-transparent" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> Email Address</label>
                  <input type="email" defaultValue="john@example.com" disabled className="w-full h-10 px-3 rounded-md border bg-muted/50 text-muted-foreground cursor-not-allowed" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1.5"><Smartphone className="h-3.5 w-3.5" /> Phone Number</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" className="w-full h-10 px-3 rounded-md border bg-transparent" />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="h-10 px-6 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
          
          {/* Passport / Document Vault */}
          <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-bold flex items-center gap-2"><Shield className="h-5 w-5" /> Travel Documents</h2>
              <p className="text-xs text-muted-foreground mt-1">Securely store your passport details to expedite tour bookings</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">No passport details saved yet.</p>
              <button className="h-10 px-4 border border-input text-foreground text-sm font-medium rounded-md hover:bg-muted transition-colors inline-block">
                + Add Document
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Preferences */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border rounded-xl shadow-sm p-6">
            <h3 className="font-bold border-b pb-3 mb-4">Preferences</h3>
            <div className="space-y-4">
              <label className="flex items-start gap-3 text-sm cursor-pointer">
                <input type="checkbox" defaultChecked className="mt-1" />
                <span><strong className="block text-foreground mb-0.5">Email Notifications</strong> Receive updates about your itinerary status and payments.</span>
              </label>
              <label className="flex items-start gap-3 text-sm cursor-pointer">
                <input type="checkbox" defaultChecked className="mt-1" />
                <span><strong className="block text-foreground mb-0.5">Marketing Offers</strong> Receive exclusive deals on luxury safaris and hidden gems.</span>
              </label>
            </div>
          </div>
          
          <div className="bg-red-50/50 border border-red-100 rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-red-800 border-b border-red-200 pb-3 mb-4">Danger Zone</h3>
            <p className="text-sm text-red-700/80 mb-4">Deleting your account will permanently remove all your past trip histories and active itineraries.</p>
            <button className="text-sm font-semibold text-red-600 hover:text-red-700">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
