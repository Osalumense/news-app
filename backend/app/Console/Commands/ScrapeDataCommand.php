<?php

namespace App\Console\Commands;

use App\Scrapers\GuardianScraper;
use App\Scrapers\NewsAPIScraper;
use App\Scrapers\NYTimesScraper;
use Illuminate\Console\Command;

class ScrapeDataCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:scrape';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $newsAPIScraper = new NewsAPIScraper();
        $newsAPIScraper->scrape();

        $guardianScraper = new GuardianScraper();
        $guardianScraper->scrape();

        $nyTimesScraper = new NYTimesScraper();
        $nyTimesScraper->scrape();

        $this->info('Data scraping completed!');
    }
}
