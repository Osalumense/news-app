<?php

namespace App\Http\Controllers\API;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PersonalizedController extends Controller
{
    /**
     * Display a list of Source
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSource()
    {
        $response['source'] = DB::table('articles')
            ->select('source_name')
            ->distinct()
            ->pluck('source_name');

        $response['category'] = DB::table('articles')
            ->select('category_name')
            ->distinct()
            ->pluck('category_name');

        $response['author'] = DB::table('articles')
            ->select('author')
            ->distinct()
            ->pluck('author');

        return response()->json($response);
    }
}
