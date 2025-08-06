import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit } from "lucide-react";
import { useEditSkill } from "@/hooks/profile/useEditSkill";
import { useAddSkill } from "@/hooks/profile/useAddSkill";

function Skills() {
  const { user } = useSelector((state: any) => state.profile);
  const { userInfo } = useSelector((state: any) => state.user);
  const userId = user?._id || user?.id;
  const isOwner = userInfo && (userInfo._id === userId || userInfo.id === userId);
  const [editingSkill, setEditingSkill] = useState<any | null>(null);
  const [form, setForm] = useState<any>({});
  const { editSkill, loading: editLoading, error: editError } = useEditSkill(userId);

  // Add Skill modal state
  const [addModal, setAddModal] = useState(false);
  const [addForm, setAddForm] = useState<any>({ name: '' });
  const { addSkill, loading: addLoading, error: addError } = useAddSkill(userId);

  const handleEditClick = (skill: any) => {
    setEditingSkill(skill);
    setForm({ ...skill });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConfirm = async () => {
    // Ensure skillId is sent
    await editSkill({ ...form, skillId: form.id });
    setEditingSkill(null);
  };

  // Add Skill handlers
  const handleAddFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleAddConfirm = async () => {
    await addSkill(addForm);
    setAddModal(false);
    setAddForm({ name: '' });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="flex space-x-2">
          {isOwner && (
            <Button variant="ghost" size="sm" onClick={() => setAddModal(true)}>
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {user?.skills?.length > 0 ? (
              user.skills.map((skill: any) => (
                <Badge key={skill.id} variant="secondary" className="flex items-center space-x-2">
                  <span>{skill.name}</span>
                  {isOwner && (
                    <Button variant="ghost" size="sm" onClick={() => handleEditClick(skill)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                  )}
                </Badge>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No skills added yet.</p>
            )}
          </div>
          {isOwner && (
            <Button variant="outline" className="w-full" onClick={() => setAddModal(true)}>
              Add Skill
            </Button>
          )}
        </div>

        {/* Edit Modal */}
        {editingSkill && isOwner && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Edit Skill</h3>
              <input
                className="w-full mb-2 p-2 border rounded"
                name="name"
                value={form.name || ""}
                onChange={handleFormChange}
                placeholder="Skill Name"
              />
              {editError && <div className="text-red-500 mb-2">{editError}</div>}
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setEditingSkill(null)} disabled={editLoading}>
                  Cancel
                </Button>
                <Button onClick={handleConfirm} disabled={editLoading}>
                  {editLoading ? "Saving..." : "Confirm"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Add Modal */}
        {addModal && isOwner && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Add Skill</h3>
              <input
                className="w-full mb-2 p-2 border rounded"
                name="name"
                value={addForm.name}
                onChange={handleAddFormChange}
                placeholder="Skill Name"
              />
              {addError && <div className="text-red-500 mb-2">{addError}</div>}
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setAddModal(false)} disabled={addLoading}>
                  Cancel
                </Button>
                <Button onClick={handleAddConfirm} disabled={addLoading}>
                  {addLoading ? "Adding..." : "Add"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default Skills;
