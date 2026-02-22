import { Category, CreateUserParams, GetMenuParams, SignInParams, User } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";
export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "com.rk.medicine",
    databaseId: '69945846002f65d4c93d',
    bucketId: '69960dc50023ca0b3f90',
    userCollectionId: 'User',
    categoriesCollectionId: 'categories',
    menuCollectionId: 'menu',
    customizationsCollectionId: 'customizations',
    menuCustomizationsCollectionId: 'menu_customizations',
    ordersCollectionId: 'orders',
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({ email, password, name }: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name)
        if (!newAccount) throw Error;

        await signIn({ email, password });

        const avatarUrl = avatars.getInitialsURL(name);

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                email,
                name,
                accountId: newAccount.$id,
                avatar: avatarUrl,
                phone: 0,
                address: "",
                isAdmin: false
            }
        );
    } catch (e) {
        throw new Error(e as string);
    }
}

export const signIn = async ({ email, password }: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (e: any) {
        if (String(e).includes('session is active')) {
            try {
                await account.deleteSession('current');
                const session = await account.createEmailPasswordSession(email, password);
                return session;
            } catch (retryError) {
                throw new Error(retryError as string);
            }
        }
        throw new Error(e as string);
    }
}

export const signOut = async () => {
    try {
        await account.deleteSession('current');
    } catch (e) {
        throw new Error(e as string);
    }
}

export const updateUserProfile = async (documentId: string, updates: Partial<User>) => {
    try {
        const updatedUser = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            documentId,
            updates
        );
        return updatedUser;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (e) {
        console.log(e);
        throw new Error(e as string);
    }
}

export const createOrder = async (orderData: {
    accountId: string;
    customerName: string;
    items: string;
    totalAmount: number;
    status: string;
    paymentMethod: string;
    address: string;
    phone: number;
}) => {
    try {
        const newOrder = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.ordersCollectionId,
            ID.unique(),
            orderData
        );
        return newOrder;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getAllOrders = async () => {
    try {
        const orders = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.ordersCollectionId,
            [Query.orderDesc('$createdAt')]
        );
        return orders.documents;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getUserOrders = async (accountId: string) => {
    try {
        const orders = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.ordersCollectionId,
            [
                Query.equal('accountId', accountId),
                Query.orderDesc('$createdAt')
            ]
        );
        return orders.documents;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const updateOrderStatus = async (documentId: string, status: string) => {
    try {
        const updatedOrder = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.ordersCollectionId,
            documentId,
            { status }
        );
        return updatedOrder;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const deleteOrder = async (documentId: string) => {
    try {
        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.ordersCollectionId,
            documentId
        );
        return true;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getMenu = async ({ category, query }: GetMenuParams) => {
    try {
        const queries: string[] = [];

        if (category) queries.push(Query.equal('categories', category));
        if (query) queries.push(Query.search('name', query));

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries,
        )

        return menus.documents;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getMenuItemById = async ({ id }: { id: string }) => {
    try {
        const menuItem = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            id
        );
        return menuItem;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const createMenuItem = async (itemData: {
    name: string;
    description: string;
    image_url: string;
    rating: number;
    price: number;
    categories: string;
}) => {
    try {
        const defaultImage = "https://static.vecteezy.com/system/resources/previews/056/808/327/large_2x/spray-bottle-isolate-no-background-generative-ai-free-png.png";

        const newItem = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            ID.unique(),
            {
                ...itemData,
                image_url: itemData.image_url.trim() !== '' ? itemData.image_url : defaultImage
            }
        );
        return newItem;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const updateMenuItem = async (documentId: string, itemData: Partial<{
    name: string;
    description: string;
    image_url: string;
    rating: number;
    price: number;
    categories: string;
}>) => {
    try {
        const defaultImage = "https://static.vecteezy.com/system/resources/previews/056/808/327/large_2x/spray-bottle-isolate-no-background-generative-ai-free-png.png";

        const payload = { ...itemData };
        if (payload.image_url !== undefined) {
            payload.image_url = payload.image_url.trim() !== '' ? payload.image_url : defaultImage;
        }

        const updatedItem = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            documentId,
            payload
        );
        return updatedItem;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const deleteMenuItem = async (documentId: string) => {
    try {
        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            documentId
        );
        return true;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getCategories = async (): Promise<Category[]> => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
        );

        return categories.documents as unknown as Category[];
    } catch (e) {
        throw new Error(e as string);
    }
};

export const createCategory = async (categoryData: {
    name: string;
    description: string;
}) => {
    try {
        const newCategory = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
            ID.unique(),
            categoryData
        );
        return newCategory;
    } catch (e) {
        throw new Error(e as string);
    }
};

export const deleteCategory = async (documentId: string) => {
    try {
        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
            documentId
        );
        return true;
    } catch (e) {
        throw new Error(e as string);
    }
};

export const getAllCustomizations = async () => {
    try {
        const customizations = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.customizationsCollectionId,
        );
        return customizations.documents;
    } catch (e) {
        throw new Error(e as string);
    }
};

export const deleteCustomization = async (documentId: string) => {
    try {
        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.customizationsCollectionId,
            documentId
        );
        return true;
    } catch (e) {
        throw new Error(e as string);
    }
};