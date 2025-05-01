import type { Person } from "~/types";

export type CreateGroupResponse = {
  id:         string;
  people:     any[];
  edit_key:   string;
  updated_at: Date;
  created_at: Date;
};

export type AddPersonToGroupParams = {
  groupId: string;
  people: Person[];
};

export const useGroup = () => {
  const supabase = useSupabaseClient();

  const createGroupInDb = async (): Promise<CreateGroupResponse | null> => {
    const { data, error } = await supabase
      .from('groups')
      .insert([
        {
          people: [],
        },
      ])
      .select()
      .maybeSingle();
    if (error) {
      console.error('Error creating group:', error);
      return null;
    }
    return {
      ...data,
      id: encodeString(data.id),
    } as CreateGroupResponse;
  }

  const updatePeopleListInDb = async ({ people, groupId }: AddPersonToGroupParams): Promise<boolean> => {
    const cleanedPeople = JSON.parse(JSON.stringify(people));
    const decodedGroupId = decodeString(groupId);

    const response = await supabase
      .from('groups')
      .update({ people: cleanedPeople })
      .eq('id', decodedGroupId)
      .select("*");
    if (response.error) {
      console.error('Error updating group:', response.error);
      return false;
    }
    return true;
  }

  const getGroupById = async (groupId: string): Promise<CreateGroupResponse | null> => {
    const decodedGroupId = decodeString(groupId);
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .eq('id', decodedGroupId)
      .single();
    if (error) {
      console.error('Error fetching group:', error);
      return null;
    }
    return {
      ...data,
      id: encodeString(data.id),
    } as CreateGroupResponse;
  }

  return {
    createGroupInDb,
    updatePeopleListInDb,
    getGroupById,
  }
}
