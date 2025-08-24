"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export const PricingPage = () => {
  const [isAnnually, setIsAnnually] = useState(false);
  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <h2 className="text-pretty text-4xl font-bold lg:text-5xl">
            Wallet Plans
          </h2>
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <p className="text-muted-foreground max-w-3xl lg:text-xl">
              Choose a plan that fits your needs. Whether you’re a casual user,
              a frequent sender, or running your own business as an agent —
              we’ve got you covered.
            </p>
            <div className="bg-muted flex h-11 w-fit shrink-0 items-center rounded-md p-1 text-lg">
              <RadioGroup
                defaultValue="monthly"
                className="h-full grid-cols-2"
                onValueChange={(value) => {
                  setIsAnnually(value === "annually");
                }}
              >
                <div className='has-[button[data-state="checked"]]:bg-background h-full rounded-md transition-all'>
                  <RadioGroupItem
                    value="monthly"
                    id="monthly"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="monthly"
                    className="text-muted-foreground peer-data-[state=checked]:text-primary flex h-full cursor-pointer items-center justify-center px-7 font-semibold"
                  >
                    Monthly
                  </Label>
                </div>
                <div className='has-[button[data-state="checked"]]:bg-background h-full rounded-md transition-all'>
                  <RadioGroupItem
                    value="annually"
                    id="annually"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="annually"
                    className="text-muted-foreground peer-data-[state=checked]:text-primary flex h-full cursor-pointer items-center justify-center gap-1 px-7 font-semibold"
                  >
                    Yearly
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Plans */}
          <div className="flex w-full flex-col items-stretch gap-6 md:flex-row">

            {/* Free Plan */}
            <div className="flex w-full flex-col p-6 text-left rounded-xl border-0 shadow-sm bg-gradient-to-br from-background to-muted/50">
              <Badge className="mb-8 block w-fit">BASIC</Badge>
              <span className="text-4xl font-medium">$0</span>
              <p className="text-muted-foreground">Always free</p>
              <Separator className="my-6" />
              <div className="flex flex-col justify-between gap-20">
                <ul className="text-muted-foreground space-y-4">
                  <li className="flex items-center gap-2"><Check className="size-4" /> Create & maintain wallet</li>
                  <li className="flex items-center gap-2"><Check className="size-4" /> Send & receive money</li>
                  <li className="flex items-center gap-2"><Check className="size-4" /> Daily limit: $200</li>
                  <li className="flex items-center gap-2"><Check className="size-4" /> Cash-in & Cash-out via agents</li>
                </ul>
                <Button className="w-full">Create Wallet</Button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="flex w-full flex-col p-6 text-left rounded-xl border-0 shadow-sm bg-gradient-to-br from-background to-muted/50">
              <Badge className="mb-8 block w-fit">PRO</Badge>
              {isAnnually ? (
                <>
                  <span className="text-4xl font-medium">$99</span>
                  <p className="text-muted-foreground">Per year</p>
                </>
              ) : (
                <>
                  <span className="text-4xl font-medium">$9</span>
                  <p className="text-muted-foreground">Per month</p>
                </>
              )}
              <Separator className="my-6" />
              <div className="flex h-full flex-col justify-between gap-20">
                <ul className="text-muted-foreground space-y-4">
                  <li className="flex items-center gap-2"><Check className="size-4" /> Everything in BASIC</li>
                  <li className="flex items-center gap-2"><Check className="size-4" /> Higher daily limit: $2,000</li>
                  <li className="flex items-center gap-2"><Check className="size-4" /> Priority customer support</li>
                  <li className="flex items-center gap-2"><Check className="size-4" /> Free withdrawal up to $500</li>
                </ul>
                <Button className="w-full">Upgrade to Pro</Button>
              </div>
            </div>

            {/* Elite Plan */}
            <div className="bg-muted flex w-full flex-col p-6 text-left rounded-xl border-0 shadow-sm bg-gradient-to-br from-background to-muted/50">
              <Badge className="mb-8 block w-fit">ELITE (Agent)</Badge>
              {isAnnually ? (
                <>
                  <span className="text-4xl font-medium">$249</span>
                  <p className="text-muted-foreground">Per year</p>
                </>
              ) : (
                <>
                  <span className="text-4xl font-medium">$29</span>
                  <p className="text-muted-foreground">Per month</p>
                </>
              )}
              <Separator className="my-6" />
              <div className="flex h-full flex-col justify-between gap-20">
                <ul className="text-muted-foreground space-y-4">
                  <li className="flex items-center gap-2"><Check className="size-4" /> Everything in PRO</li>
                  <li className="flex items-center gap-2"><Check className="size-4" /> Become a verified agent</li>
                  <li className="flex items-center gap-2"><Check className="size-4" /> Earn commission on transactions</li>
                  <li className="flex items-center gap-2"><Check className="size-4" /> Unlimited withdrawals</li>
                </ul>
                <Button className="w-full">Become an Agent</Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
