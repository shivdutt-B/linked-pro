import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit } from "lucide-react";

function Skills() {
  const { user } = useSelector((state: any) => state.profile);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {user?.skills?.length > 0 ? (
              user.skills.map((skill: any) => (
                <Badge key={skill.id} variant="secondary">
                  {skill.name}
                </Badge>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No skills added yet.</p>
            )}
          </div>

          {/* {user?.skills?.length > 5 && (
            <Button variant="link" className="p-0">
              Show all {user.skills.length} skills →
            </Button>
          )} */}
        </div>
      </CardContent>
    </Card>
  );
}

export default Skills;
