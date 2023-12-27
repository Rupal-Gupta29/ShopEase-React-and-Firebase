import { initializeApp } from "firebase/app";
import { createContext, useContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";

const firebaseContext = createContext();
export const useFirebase = () => useContext(firebaseContext);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
export const firestore = getFirestore(app);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userDocId, setUserDocId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user !== null) {
      getUserProfile()
        .then((profile) => {
          setUserProfile(profile);
          setUserDocId(profile.docId);
        })
        .catch((err) => console.log("Error in getting profile details", err));
    }
  }, [user]);

  const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const creatingUserInDB = async (name, number, email, address, uid) => {
    let colRef = collection(firestore, "users");
    return await addDoc(colRef, {
      userName: name,
      email: email,
      phNumber: Number(number),
      address: address,
      uid: uid,
    });
  };

  const signInUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = async () => {
    return await signOut(auth);
  };

  const getUserProfile = async () => {
    const colRef = collection(firestore, "users");
    const q = query(colRef, where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    let profile;
    querySnapshot.forEach((doc) => {
      profile = { ...doc.data(), docId: doc.id };
    });
    return profile;
  };

  const updateUserProfile = async (docId, number, address) => {
    let docRef = doc(firestore, "users", docId);
    return await updateDoc(docRef, {
      phNumber: number,
      address: address,
    });
  };

  const addProduct = async (
    title,
    brand,
    category,
    mrp,
    salePrice,
    specification,
    productImg,
    productUID
  ) => {
    let colRef = collection(firestore, "products");
    const imgRef = ref(storage, `productImages/${Date.now()}-${productImg}`);
    const uploadResult = await uploadBytes(imgRef, productImg);
    return await addDoc(colRef, {
      title: title,
      brand: brand,
      category: category,
      mrp: mrp,
      salePrice: salePrice,
      specification: specification,
      imgURL: uploadResult.ref.fullPath,
      addedOn: new Date().toDateString(),
      productUID: productUID,
    });
  };

  const getImgURL = async (path) => {
    return await getDownloadURL(ref(storage, path));
  };

  const deleteProductById = async (prodId) => {
    return await deleteDoc(doc(firestore, "products", prodId));
  };

  const getFilteredProducts = async (categoryName, price) => {
    let q;
    const colRef = collection(firestore, "products");
    if (categoryName === null) {
      q = query(colRef, where("salePrice", "<", Number(price)));
    } else if (price === null) {
      q = query(colRef, where("category", "==", categoryName));
    } else {
      q = query(
        colRef,
        where("category", "==", categoryName),
        where("salePrice", "<", Number(price))
      );
    }
    return await getDocs(q);
  };

  const addToCart = async (productUID, qty, salePrice, title) => {
    let documentId = userProfile.docId;
    let colRef = collection(firestore, "users", documentId, "cart");
    let isPresent = await checkIfProductIsPresentInCart(productUID);
    if (isPresent) {
      return "alreadyPresent";
    } else {
      return await addDoc(colRef, {
        productUID,
        qty,
        salePrice,
        title,
      });
    }
  };

  const checkIfProductIsPresentInCart = async (productUID) => {
    let documentId = userProfile.docId;
    let colRef = collection(firestore, "users", documentId, "cart");
    const q = query(colRef, where("productUID", "==", productUID));
    const querySnapshot = await getDocs(q);
    let productData;
    querySnapshot.forEach((doc) => {
      productData = { ...doc.data() };
    });
    return productData;
  };

  const getProductByProductUID = async (productUID) => {
    const colRef = collection(firestore, "products");
    const q = query(colRef, where("productUID", "==", productUID));
    const querySnapshot = await getDocs(q);
    let productData;
    querySnapshot.forEach((doc) => {
      productData = { ...doc.data() };
    });
    return productData;
  };

  const changeProductQty = async (docId, updatedQty) => {
    let docRef = doc(firestore, "users", userDocId, "cart", docId);
    return await updateDoc(docRef, {
      qty: updatedQty,
    });
  };

  const deleteProductFromCart = async (docId) => {
    let docRef = doc(firestore, "users", userDocId, "cart", docId);
    return await deleteDoc(docRef);
  };

  const getCartDetails = async () => {
    let documentId = userProfile.docId;
    let cartColRef = collection(firestore, "users", documentId, "cart");
    return await getDocs(cartColRef);
  };

  const emptyCart = () => {
    let documentId = userProfile.docId;
    let cartColRef = collection(firestore, "users", documentId, "cart");
    getDocs(cartColRef).then((cartData) => {
      cartData.forEach((document) => {
        let docRef = doc(firestore, "users", userDocId, "cart", document.id);
        deleteDoc(docRef);
      });
    });
  };

  const placeOrder = async () => {
    let documentId = userProfile.docId;
    let itemsArr = [];
    let orderTotal = 0;
    await getCartDetails().then((cartData) => {
      cartData.forEach((product) => {
        let productData = product.data();
        itemsArr.push({
          title: productData.title,
          qty: productData.qty,
          totalAmount: productData.qty * productData.salePrice,
        });
        orderTotal += productData.qty * productData.salePrice;
      });
    });
    let colRef = collection(firestore, "users", documentId, "orders");
    await addDoc(colRef, {
      orderPlacedOn: new Date().toDateString(),
      products: itemsArr,
      orderSubTotal: orderTotal,
    });
    return emptyCart();
  };

  const getOrderDetails = async () => {
    let documentId = userProfile.docId;
    let colRef = collection(firestore, "users", documentId, "orders");
    return await getDocs(colRef);
  };

  return (
    <firebaseContext.Provider
      value={{
        registerUser,
        creatingUserInDB,
        signInUser,
        signOutUser,
        user,
        userDocId,
        userProfile,
        getUserProfile,
        updateUserProfile,
        addProduct,
        getImgURL,
        deleteProductById,
        getFilteredProducts,
        addToCart,
        getProductByProductUID,
        changeProductQty,
        deleteProductFromCart,
        placeOrder,
        getOrderDetails,
      }}
    >
      {children}
    </firebaseContext.Provider>
  );
};
