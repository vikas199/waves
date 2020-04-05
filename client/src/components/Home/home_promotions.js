import React from "react"
import MyButton from "../../utils/button"

export default function HomePromotions() {
  const promotion = [
    {
      img: "/images/featured/featured_home_3.jpg",
      lineOne: "Up to 40% off",
      lineTwo: "In Second hand guitars",
      linkTitle: "Shop now",
      linkTo: "/shop"
    }
  ]

  const renderPromotions = () =>
    promotion
      ? promotion.map((item, i) => (
          <div key={i} className="home_promotion_img" style={{ background: `url(${item.img})` }}>
            <div className="tag title">{item.lineOne}</div>
            <div className="tag low_title">{item.lineTwo}</div>
            <MyButton
              type="default"
              title={item.linkTitle}
              linkTo={item.lineTwo}
              addStyles={{ margin: "10px 0 0 0 " }}
            />
          </div>
        ))
      : null
  return <div className="home_promotion">{renderPromotions()}</div>
}
