import React from 'react'
import { StyleSheet, View, ActivityIndicator } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'


const CarouselCards = ({ loading, count, completed, ongoing, canclled, rejected, pending }: any) => {

  const isCarousel = React.useRef(null)
  const [index, setIndex] = React.useState(0)


  const data = [

    // {
    //     title: 'Amount Earned',
    //     body: '105,000',
    //     naira: '₦',
    //     cent: '.00'
    // },
    {
      title: 'Total Verifications',
      body: !count ? '0' : count,

    },
    {
      title: 'Pending Verifications',
      body: !pending ? '0' : pending,

    },
    {
      title: 'Ongoing Verification',
      body: !ongoing ? '0' : ongoing,

    },
    {
      title: 'Cancelled',
      body: !canclled ? '0' : canclled,

    },
    {
      title: 'Rejected',
      body: !rejected ? '0' : rejected,

    },
    {
      title: 'Completed',
      body: !completed ? 0 : completed,

    },
  ]

  return (
    <View>
      {/* @ts-ignore */}
      <Carousel
        layout="default"
        layoutCardOffset={0}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
        onSnapToItem={(index: React.SetStateAction<number>) => setIndex(index)}
      />
      <View style={styles.pagination} >
        <Pagination
          dotsLength={data.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      </View>
      <View style={styles.mainContainer}>
        {loading ? <ActivityIndicator color={"#fff"} /> : null}

      </View>
    </View>
  )
}


export default CarouselCards

const styles = StyleSheet.create({
  ActivityIndicator: {
    color: "#fff",
  },
  mainContainer: {
    position: "absolute",
    backgroundColor: "red ",
    top: 20,
    right: 100,
  },
  pagination: {
    position: "relative",
    top: -55,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
});