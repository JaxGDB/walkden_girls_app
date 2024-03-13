import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/HomeScreen/Header'
import Slider from '../Components/HomeScreen/Slider'
import { getFirestore, collection, getDocs, doc, orderBy } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import Categories from '../Components/HomeScreen/Categories'
import LatestPostList from '../Components/HomeScreen/LatestPostList'

export default function HomeScreen() {

  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState([]);
  const [categoryList ,setCategoryList] = useState([]);
  const [latestPostList ,setLatestPostList] = useState([]);

  useEffect(() => {
      getSlider();
      getCategoryList();
      getLatestPostList();
  },[])

  const getSlider = async () => {
    setSliderList([])
    const querySnapshot = await getDocs(collection(db, "Slider"));
    querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  
  setSliderList(sliderList => [...sliderList, doc.data()]);

});

  }

  const getCategoryList = async() => {
    setCategoryList([]);
      const querySnapshot = await getDocs(collection(db, 'Category'));
      querySnapshot.forEach((doc) => {
        console.log("Docs2: ", doc.data());
        setCategoryList(categoryList => [...categoryList, doc.data()]);
      })
  }

  const getLatestPostList = async() => {
    setLatestPostList([]);
    const querySnapshot = await getDocs(collection(db, 'UserPost'), orderBy('createdAt', 'desc'));
    querySnapshot.forEach((doc) => {
      console.log("Lastest Post:", doc.data());
      setLatestPostList(latestPostList => [...latestPostList, doc.data()]);
    })
  }

  return (
    <ScrollView className="py-8 px-6 bg-white flex-1">
      <Header />
      <Slider sliderList={sliderList}/>
      <Categories categoryList={categoryList} />
      <LatestPostList latestPostList={latestPostList} />
    </ScrollView>
  )
}