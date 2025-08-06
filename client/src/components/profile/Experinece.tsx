import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit } from "lucide-react";
import { format } from "date-fns";

function Experience() {
  const { user } = useSelector((state: any) => state.profile);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold">Experience</h2>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {user?.experiences?.length > 0 ? (
          user.experiences.map((exp, index) => (
            <div key={exp.id} className="space-y-2">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {exp.org?.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{exp.title}</h3>
                  <p className="text-muted-foreground">{exp.org}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(exp.fromDate), "yyyy-MM-dd")} -{" "}
                    {exp.toDate ? format(new Date(exp.toDate), "yyyy-MM-dd") : "Present"}
                  </p>
                </div>
              </div>
              {index !== user.experiences.length - 1 && <Separator />}
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No experiences added yet.</p>
        )}

        <Button variant="outline" className="w-full">
          Add experience
        </Button>
      </CardContent>
    </Card>
  );
}

export default Experience;
