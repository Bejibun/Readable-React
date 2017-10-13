import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Divider} from 'semantic-ui-react'
import SiteHeader from 'src/components/header'
import SiteFooter from 'src/components/footer'
import HomepageControls from './components/controls'
import HomepagePosts from './components/posts'
import {getPosts, getPostsByCategory} from 'src/actions/posts'

class Homepage extends Component {
  componentDidMount () {
    this.loadData()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.loadData()
    }
  }

  loadData = () => {
    const {category} = this.props.match.params
    if (category != null) {
      this.props.getPostsByCategory(category)
    } else {
      this.props.getPosts()
    }
  }

  render () {
    return (
      <div>
        <SiteHeader params={this.props.match.params} />
        <Divider horizontal>Posts</Divider>
        <HomepageControls />
        <Divider hidden />
        <HomepagePosts />
        <SiteFooter />
      </div>
    )
  }
}

const mapStateToProps = ({categories, posts}) => ({categories, posts})
const mapDispatchToProps = {getPosts, getPostsByCategory}
export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
