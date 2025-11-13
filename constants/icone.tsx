import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export const icons: Record<string, any> = {
  Favorites: (props: any) => (
    <MaterialIcons name="favorite-border" size={24} {...props} />
  ),
  ListOfAttractions: (props: any) => (
    <Feather name="compass" size={24} {...props} />
  ),
};
