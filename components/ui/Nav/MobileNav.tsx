"use client";

import { useState } from 'react';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { PanelLeft, Home, ShoppingCart, Package, Users2, AppWindow, LineChart, Settings } from 'lucide-react';
import Link from 'next/link';

export default function MobileNav() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Open the sheet
  const toggleSheet = () => setIsSheetOpen(true);

  // Close the sheet
  const closeSheet = () => setIsSheetOpen(false);

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden" onClick={toggleSheet}>
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link href="/" className="flex items-center gap-4 px-2.5" onClick={closeSheet}>
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/orders" className="flex items-center gap-4 px-2.5" onClick={closeSheet}>
            <ShoppingCart className="h-5 w-5" />
            Orders
          </Link>
          <Link href="/" className="flex items-center gap-4 px-2.5" onClick={closeSheet}>
            <Package className="h-5 w-5" />
            Products
          </Link>
          <Link href="/customers" className="flex items-center gap-4 px-2.5" onClick={closeSheet}>
            <Users2 className="h-5 w-5" />
            Customers
          </Link>
          <Link href="/cms" className="flex items-center gap-4 px-2.5" onClick={closeSheet}>
            <AppWindow className="h-5 w-5" />
            Content Manager
          </Link>
          <Link href="/analytics" className="flex items-center gap-4 px-2.5" onClick={closeSheet}>
            <LineChart className="h-5 w-5" />
            Analytics
          </Link>
          <Link href="/options" className="flex items-center gap-4 px-2.5" onClick={closeSheet}>
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
