import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProfileLoading = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Skeleton className="h-8 w-32" />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Section */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Header Card */}
            <Card>
              <div className="relative">
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <CardContent className="relative pt-0 pb-6">
                  <div className="absolute -top-20 left-6">
                    <Skeleton className="h-32 w-32 rounded-full border-4 border-background" />
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Skeleton className="h-8 w-24 rounded" />
                    <Skeleton className="h-8 w-32 rounded" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                  <div className="mt-16 space-y-4">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-6 w-96" />
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-5 w-32" />
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-64 mt-2" />
                        <Skeleton className="h-4 w-24 mt-2" />
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </div>
            </Card>
            {/* About Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-5 w-2/3" />
              </CardContent>
            </Card>
            {/* Activity Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-24" />
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 mb-4">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-start space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-40 mt-1" />
                      <Skeleton className="h-4 w-64 mt-2" />
                      <Skeleton className="h-4 w-80 mt-2" />
                      <div className="flex items-center space-x-6 mt-4 pt-3 border-t">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-16" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Experience Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Skeleton className="w-12 h-12 rounded" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>
            {/* Education Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-64" />
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-1 w-full" />
                  <div className="flex items-start space-x-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-40" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Skills Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="h-6 w-20" />
                    ))}
                  </div>
                  <Skeleton className="h-4 w-32 mt-2" />
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Sidebar */}
          {/* <div className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-16 mt-1" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-32 mt-1" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-5 w-40" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-40 mt-1" />
                    </div>
                    <Skeleton className="h-8 w-16" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileLoading;
