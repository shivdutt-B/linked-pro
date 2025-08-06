import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit } from "lucide-react";
import { format } from "date-fns";
import { useEditExperience } from "@/hooks/profile/useEditExperience";
import { useAddExperience } from "@/hooks/profile/useAddExperience";

function Experience() {
  const { user } = useSelector((state: any) => state.profile);
  const { userInfo } = useSelector((state: any) => state.user);
  const userId = user?._id || user?.id;
  const isOwner = userInfo && (userInfo._id === userId || userInfo.id === userId);
  const [editingExp, setEditingExp] = useState<any | null>(null);
  const [form, setForm] = useState<any>({});
  const { editExperience, loading: editLoading, error: editError } = useEditExperience(userId);

  // Add Experience modal state
  const [addModal, setAddModal] = useState(false);
  const [addForm, setAddForm] = useState<any>({ title: '', org: '', fromDate: '', toDate: '' });
  const { addExperience, loading: addLoading, error: addError } = useAddExperience(userId);

  const handleEditClick = (exp: any) => {
    setEditingExp(exp);
    setForm({ ...exp });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConfirm = async () => {
    // Ensure experienceId is sent
    await editExperience({ ...form, experienceId: form.id });
    setEditingExp(null);
  };

  // Add Experience handlers
  const handleAddFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleAddConfirm = async () => {
    // Convert dates to ISO strings if present
    const dataToSend = {
      ...addForm,
      fromDate: addForm.fromDate ? new Date(addForm.fromDate).toISOString() : undefined,
      toDate: addForm.toDate ? new Date(addForm.toDate).toISOString() : undefined,
    };
    await addExperience(dataToSend);
    setAddModal(false);
    setAddForm({ title: '', org: '', fromDate: '', toDate: '' });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold">Experience</h2>
        <div className="flex space-x-2">
          {isOwner && (
            <Button variant="ghost" size="sm" onClick={() => setAddModal(true)}>
              <Plus className="h-4 w-4" />
            </Button>
          )}
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
                    {format(new Date(exp.fromDate), "yyyy-MM-dd")} - {exp.toDate ? format(new Date(exp.toDate), "yyyy-MM-dd") : "Present"}
                  </p>
                </div>
                {isOwner && (
                  <Button variant="ghost" size="sm" onClick={() => handleEditClick(exp)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {index !== user.experiences.length - 1 && <Separator />}
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No experiences added yet.</p>
        )}
        {isOwner && (
          <Button variant="outline" className="w-full" onClick={() => setAddModal(true)}>
            Add experience
          </Button>
        )}
        {/* Edit Modal */}
        {editingExp && isOwner && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Edit Experience</h3>
              <input
                className="w-full mb-2 p-2 border rounded"
                name="title"
                value={form.title || ""}
                onChange={handleFormChange}
                placeholder="Title"
              />
              <input
                className="w-full mb-2 p-2 border rounded"
                name="org"
                value={form.org || ""}
                onChange={handleFormChange}
                placeholder="Organization"
              />
              <input
                className="w-full mb-2 p-2 border rounded"
                name="fromDate"
                value={form.fromDate || ""}
                onChange={handleFormChange}
                placeholder="From Date"
                type="date"
              />
              <input
                className="w-full mb-2 p-2 border rounded"
                name="toDate"
                value={form.toDate || ""}
                onChange={handleFormChange}
                placeholder="To Date"
                type="date"
              />
              {editError && <div className="text-red-500 mb-2">{editError}</div>}
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setEditingExp(null)} disabled={editLoading}>
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
              <h3 className="text-lg font-semibold mb-4">Add Experience</h3>
              <input
                className="w-full mb-2 p-2 border rounded"
                name="title"
                value={addForm.title}
                onChange={handleAddFormChange}
                placeholder="Title"
              />
              <input
                className="w-full mb-2 p-2 border rounded"
                name="org"
                value={addForm.org}
                onChange={handleAddFormChange}
                placeholder="Organization"
              />
              <input
                className="w-full mb-2 p-2 border rounded"
                name="fromDate"
                value={addForm.fromDate}
                onChange={handleAddFormChange}
                placeholder="From Date"
                type="date"
              />
              <input
                className="w-full mb-2 p-2 border rounded"
                name="toDate"
                value={addForm.toDate}
                onChange={handleAddFormChange}
                placeholder="To Date"
                type="date"
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

export default Experience;
