import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country:'in',
        pageSize:8,
        category: 'general'
      };
      static propsTypes = {
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
      };
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1e9b7cde453f4d55afaca8a19c2020b9&pageSize=${this.props.pageSize}`
        {this.setState({loading:true})}
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({ articles: parsedData.articles , totalResults:parsedData.totalResults ,loading:false })
    }
    handlePrevClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1e9b7cde453f4d55afaca8a19c2020b9&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        {this.setState({loading:true})}
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            page : this.state.page - 1,
            articles: parsedData.articles,
            loading:false
        })
    }
    handleNextClick = async ()=>{
        if(!(this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize))){

            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1e9b7cde453f4d55afaca8a19c2020b9&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
            {this.setState({loading:true})}
            let data = await fetch(url)
            let parsedData = await data.json()
            this.setState({
                page : this.state.page + 1,
                articles: parsedData.articles,
                loading:false
            })
        }

    }

    render() {
        return (
            <div className='container my-3'>
                <h2>eNews - Top Headlines</h2>
                {this.state.loading && <Spinner/>}
                <div className='row'>
                    {!this.state.loading && this.state.articles.map((element)=>{
                        return (
                        <div className='col-md-4'>
                            <NewsItem title = {element.title?element.title.slice(0,45):""} description = {element.description?element.description.slice(0,88):""} imageUrl = {element.urlToImage} newsUrl = {element.url}/>
                        </div>
                        )
                    })}
                </div>
                <div className='container d-flex justify-content-between'>
                <button type="button" disabled={this.state.page<=1} class="btn btn-dark"onClick={this.handlePrevClick}>&larr; Previous</button>
                <button type="button" disabled={this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize)}class="btn btn-dark"onClick={this.handleNextClick} >Next &rarr;</button>

                </div>
            </div>
        )
    }
}

export default News