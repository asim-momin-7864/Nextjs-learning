"use client";

import {
  User,
  MapPin,
  Phone,
  Mail,
  Edit3,
  Package,
  CreditCard,
  LogOut,
} from "lucide-react";
import Container from "../ui/container";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

// --

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/hooks/use-auth-hook";
import { useAuthStore } from "@/store/use-auth-store";
import { Skeleton } from "../ui/skeleton";

const ProfilePage = () => {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const logoutFn = useAuthStore((state) => state.logout);

  //
  const { data: user, isPending, isError } = useUserProfile();

  // check - if not token (forcefully try to go in this page)
  useEffect(() => {
    if (!token || isError) {
      logoutFn();
      router.push("/login");
    }
  }, [token, isError, logoutFn, router]);

  // handle logout
  function handleLogout() {
    logoutFn();
    router.push("/logout");
  }

  // loader
  if (isPending) {
    return (
      <Card className="w-full max-w-md mx-auto shadow-md">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-9 w-full" />
        </CardFooter>
      </Card>
    );
  }

  // another check - if user is not properly loaded then return null
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-140px)] bg-background py-10">
      <Container variant="default">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Sidebar / Profile Summary */}
          <div className="flex w-full flex-col gap-6 md:w-1/3 lg:w-1/4">
            <Card className="border-border/40 bg-card/60 text-center shadow-sm backdrop-blur-md">
              <CardContent className="flex flex-col items-center pt-8">
                <Avatar className="mb-4 h-24 w-24 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
                  <AvatarImage src={user.image} alt={user.username} />
                </Avatar>
                <h2 className="text-xl font-bold tracking-tight">
                  {user.firstName + " " + user.lastName}
                </h2>
                <p className="mb-6 text-sm text-muted-foreground">
                  {user.email}
                </p>
                <Button variant="outline" className="w-full rounded-full">
                  <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Navigation Menu (Dummy UI) */}
            <Card className="hidden border-border/40 bg-card/60 shadow-sm backdrop-blur-md md:block">
              <CardContent className="p-3">
                <nav className="flex flex-col space-y-1">
                  <Button
                    variant="ghost"
                    className="justify-start bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
                  >
                    <User className="mr-2 h-4 w-4" /> Personal Info
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  >
                    <Package className="mr-2 h-4 w-4" /> My Orders
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  >
                    <MapPin className="mr-2 h-4 w-4" /> Saved Addresses
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  >
                    <CreditCard className="mr-2 h-4 w-4" /> Payment Methods
                  </Button>
                  <Separator className="my-2" />
                  <Button
                    variant="ghost"
                    className="justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-1 flex-col gap-6">
            {/* Personal Information */}
            <Card className="border-border/40 bg-card/60 shadow-sm backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-xl">Personal Information</CardTitle>
                <CardDescription>
                  Manage your basic personal details.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    First Name
                  </p>
                  <p className="text-base font-semibold">{user.firstName}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Last Name
                  </p>
                  <p className="text-base font-semibold">{user.lastName}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Email Address
                  </p>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="text-base font-semibold">{user.email}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Phone Number
                  </p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="text-base font-semibold">+81 965-431-3024</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Default Shipping Address */}
            <Card className="border-border/40 bg-card/60 shadow-sm backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-xl">
                    Default Shipping Address
                  </CardTitle>
                  <CardDescription>
                    Where your orders will be shipped by default.
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Edit3 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-background/50 p-4">
                  <MapPin className="mt-1 h-5 w-5 text-primary" />
                  <div className="space-y-1.5">
                    <p className="font-semibold text-foreground">Emilys Home</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      626 Main Street
                      <br />
                      Phoenix, Mississippi (MS) 29112
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;
