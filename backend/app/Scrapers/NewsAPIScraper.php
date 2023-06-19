<?php

namespace App\Scrapers;

use App\Models\Article;
use GuzzleHttp\Client;

class NewsAPIScraper
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = '7fc22e340f43440383e9a460ab73c3c9';
    }

    public function scrape()
    {
        $url = "https://newsapi.org/v2/top-headlines?country=us&apiKey={$this->apiKey}";

        $response = $this->client->get($url);
        $data = json_decode($response->getBody(), true);

        // Process the retrieved data as needed
        $articles = $data['articles'];

        // Save articles to the database or perform other operations
        // Example: Store articles in the 'news_articles' table
        foreach ($articles as $articleData) {
            // Check if an article with the same title already exists
            $existingArticle = Article::where('title', $articleData['title'])->first();

            if ($existingArticle) {
                // Article with the same title already exists, skip saving
                continue;
            }

            // Create a new Article instance and populate its attributes
            $article = new Article();
            $article->title = $articleData['title'];
            $article->body = $articleData['description'];
            $article->author = $articleData['author'];
            $article->images = $articleData['urlToImage'];
            $article->published_at = $articleData['publishedAt'];
            $article->category_name = $articleData['source']['name'];
            $article->source_name ='NewsAPI';
            $article->url = $articleData['url'];
            $article->api_type = 1;

            // Save the article to the database
            $article->save();
        }

        // Add any additional processing or operations as needed
    }
}
