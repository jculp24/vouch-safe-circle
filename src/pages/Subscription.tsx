import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Shield } from "lucide-react";
import Header from "@/components/shared/Header";

const Subscription = () => {
  const [currentPlan, setCurrentPlan] = useState("free");
  
  const plans = [
    {
      id: "free",
      name: "Basic",
      price: "Free",
      description: "Essential features for social verification",
      features: [
        "Search and view profiles",
        "Give up to 5 endorsements",
        "Basic identity verification",
        "Safety resources"
      ],
      popular: false
    },
    {
      id: "premium",
      name: "Premium",
      price: "$4.99/month",
      description: "Enhanced features for deeper verification",
      features: [
        "Everything in Basic",
        "Give unlimited endorsements",
        "Background check summaries ($1 per check)",
        "Priority verification",
        "Advanced privacy controls",
        "Priority customer support"
      ],
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$19.99/month",
      description: "Advanced features for organizations",
      features: [
        "Everything in Premium",
        "Bulk background checks",
        "Team management",
        "API access",
        "Custom integrations",
        "Dedicated support"
      ],
      popular: false
    }
  ];

  const handleSubscribe = (planId: string) => {
    // Mock subscription - would integrate with Stripe
    console.log(`Subscribing to ${planId}`);
    setCurrentPlan(planId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Choose Your Plan</h1>
          <p className="text-muted-foreground">
            Upgrade to unlock additional verification features and build stronger trust
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative ${
                plan.popular ? "border-primary shadow-lg" : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-2">
                  {plan.id === "free" && <Shield className="h-8 w-8 text-primary" />}
                  {plan.id === "premium" && <Crown className="h-8 w-8 text-primary" />}
                  {plan.id === "enterprise" && <Crown className="h-8 w-8 text-primary" />}
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-2xl font-bold text-primary">{plan.price}</div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  variant={currentPlan === plan.id ? "secondary" : "default"}
                  className="w-full"
                  disabled={currentPlan === plan.id}
                >
                  {currentPlan === plan.id ? "Current Plan" : 
                   plan.id === "free" ? "Current Plan" : "Upgrade"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium">What are background check summaries?</h4>
              <p className="text-sm text-muted-foreground">
                Get simplified summaries of public records, criminal history, and other relevant information for $1 per check.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium">Can I cancel anytime?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium">How does billing work?</h4>
              <p className="text-sm text-muted-foreground">
                Plans are billed monthly. Background checks are charged separately per use.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Subscription;