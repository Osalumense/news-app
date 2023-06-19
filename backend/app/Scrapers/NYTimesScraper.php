<?php

namespace App\Scrapers;

use GuzzleHttp\Client;
use App\Models\Article;

class NYTimesScraper
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = 'VlhNVUDkTcqEDYSaYuu6vAgX8ZGS9Clb';
    }

    public function scrape()
    {
        $url = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key={$this->apiKey}";

        $response = $this->client->get($url);
        $data = json_decode($response->getBody(), true);

        // Process the retrieved data as needed
        $articles = $data['results'];

        // Save articles to the database or perform other operations
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
            $article->body = $articleData['abstract'];
            $article->author = $articleData['byline'];
            $article->images = $articleData['multimedia'][0]['url'];
            $article->published_at = $articleData['published_date'];
            $article->category_name = $articleData['subsection'];
            $article->source_name ='NYTimes';
            $article->url = $articleData['url'];
            $article->api_type = 3;

            // Save the article to the database
            $article->save();
        }

        // Add any additional processing or operations as needed
    }
}
