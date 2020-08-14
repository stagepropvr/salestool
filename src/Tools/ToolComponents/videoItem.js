import React from 'react'

export default class VideoItem extends React.PureComponent {
  videoRef = React.createRef()

  componentDidMount () {
    
    const { stream } = this.props
    const video = this.videoRef.current
    if ('srcObject' in video) {
      video.srcObject = stream
    } else {
      video.src = window.URL.createObjectURL(stream) // for older browsers
    }
  }
  

  render () {
    const { userId } = this.props
    return (
        <video className="user-video"
          id={`video-${userId}`}
          autoPlay muted={this.props.type}
          ref={this.videoRef}
        />
    )
  }
}
