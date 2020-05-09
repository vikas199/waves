import React, { Component } from "react"
import LightBoxImage from "../utils/LightBox"

export default class ProdImage extends Component {
  state = {
    lightboxIsOpen: true,
    imgPos: 0,
    lightboxImages: [],
  }

  componentDidMount() {
    const { detail } = this.props
    if (detail.images.length > 0) {
      let lightboxImages = []
      detail.images.forEach((element) => {
        lightboxImages.push(element.url)
      })
      this.setState({ lightboxImages: lightboxImages })
    }
  }

  renderCardImage = (images) => {
    if (images.length > 0) {
      return images[0].url
    } else {
      return `/images/image_not_available.png`
    }
  }

  handleLightbox = (pos) => {
    if (this.state.lightboxImages.length > 0) {
      this.setState({ lightbox: true, imgPos: pos })
    }
  }

  handleLightboxClose = () => {
    this.setState({ lightbox: false })
  }

  showThumbs = () =>
    this.state.lightboxImages.map((item, i) =>
      i > 0 ? (
        <div
          key={i}
          onClick={() => this.statehandleLightbox(i)}
          className="thumb"
          style={{ background: `url(${item}) no-repeat` }}
        ></div>
      ) : null
    )
  render() {
    const { detail } = this.props
    return (
      <div className="product_image_container">
        <div className="main_pic">
          <div
            style={{ background: `url(${this.renderCardImage(detail.images)}) no-repeat` }}
            onClick={() => this.handleLightbox(0)}
          ></div>
        </div>
        <div className="main_thumbs">{this.showThumbs()} </div>
        {this.state.lightbox ? (
          <LightBoxImage
            id={detail.id}
            images={this.state.lightboxImages}
            open={this.state.lightboxIsOpen}
            pos={this.state.imgPos}
            onClose={() => this.handleLightboxClose()}
          />
        ) : null}
      </div>
    )
  }
}
