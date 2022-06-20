import {
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'

function Share({ url, title }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={30} round />
      </FacebookShareButton>
      <RedditShareButton url={url} title={title} windowWidth={660} windowHeight={460}>
        <RedditIcon size={30} round />
      </RedditShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={30} round />
      </TwitterShareButton>
    </div>
  )
}

export default Share
