import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit } from "lucide-react";
import { useSelector } from "react-redux";
import { useEditEducation } from "@/hooks/profile/useEditEducation";
import { useAddEducation } from "@/hooks/profile/useAddEducation";

export default function Education() {
  const { user } = useSelector((state: any) => state.profile);
  const { userInfo } = useSelector((state: any) => state.user);
  const userId = user?._id || user?.id;
  const isOwner = userInfo && (userInfo._id === userId || userInfo.id === userId);
  const [editingEdu, setEditingEdu] = useState<any | null>(null);
  const [form, setForm] = useState<any>({});
  const { editEducation, loading: editLoading, error: editError } = useEditEducation(userId);

  // Add Education modal state
  const [addModal, setAddModal] = useState(false);
  const [addForm, setAddForm] = useState<any>({ school: '', title: '', year: '' });
  const { addEducation, loading: addLoading, error: addError } = useAddEducation(userId);

  const handleEditClick = (edu: any) => {
    setEditingEdu(edu);
    setForm({ ...edu });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConfirm = async () => {
    // Ensure educationId is sent and year is a number
    await editEducation({ ...form, educationId: form.id, year: form.year ? Number(form.year) : undefined });
    setEditingEdu(null);
  };

  // Add Education handlers
  const handleAddFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleAddConfirm = async () => {
    // Ensure year is a number
    const dataToSend = {
      ...addForm,
      year: addForm.year ? Number(addForm.year) : undefined,
    };
    await addEducation(dataToSend);
    setAddModal(false);
    setAddForm({ school: '', title: '', year: '' });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold">Education</h2>
        <div className="flex space-x-2">
          {isOwner && (
            <Button variant="ghost" size="sm" onClick={() => setAddModal(true)}>
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {user?.educations?.length > 0 ? (
          user.educations.map((edu, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <h3 className="font-medium">{typeof edu.school === 'object' ? JSON.stringify(edu.school) : String(edu.school)}</h3>
                  <p className="text-muted-foreground">{typeof edu.title === 'object' ? JSON.stringify(edu.title) : String(edu.title)}</p>
                    <p className="text-sm text-muted-foreground">
                    Duration - {String(edu.year)} years
                  </p>
                </div>
                {isOwner && (
                  <Button variant="ghost" size="sm" onClick={() => handleEditClick(edu)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {index !== user.educations.length - 1 && <Separator />}
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-sm">
            No education info available.
          </p>
        )}
        {isOwner && (
          <Button variant="outline" className="w-full" onClick={() => setAddModal(true)}>
            Add Education
          </Button>
        )}

        {/* Edit Modal */}
        {editingEdu && isOwner && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Edit Education</h3>
              <input
                className="w-full mb-2 p-2 border rounded"
                name="school"
                value={form.school || ""}
                onChange={handleFormChange}
                placeholder="School"
              />
              <input
                className="w-full mb-2 p-2 border rounded"
                name="title"
                value={form.title || ""}
                onChange={handleFormChange}
                placeholder="Degree/Title"
              />
              <input
                className="w-full mb-2 p-2 border rounded"
                name="year"
                value={form.year || ""}
                onChange={handleFormChange}
                placeholder="Years"
                type="number"
              />
              {editError && <div className="text-red-500 mb-2">{editError}</div>}
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setEditingEdu(null)} disabled={editLoading}>
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
              <h3 className="text-lg font-semibold mb-4">Add Education</h3>
              <input
                className="w-full mb-2 p-2 border rounded"
                name="school"
                value={addForm.school}
                onChange={handleAddFormChange}
                placeholder="School"
              />
              <input
                className="w-full mb-2 p-2 border rounded"
                name="title"
                value={addForm.title}
                onChange={handleAddFormChange}
                placeholder="Degree/Title"
              />
              <input
                className="w-full mb-2 p-2 border rounded"
                name="year"
                value={addForm.year}
                onChange={handleAddFormChange}
                placeholder="Years"
                type="number"
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
