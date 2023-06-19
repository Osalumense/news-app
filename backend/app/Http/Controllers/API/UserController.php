<?php
namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public $successStatus = 200;
    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(){
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')-> accessToken;
            return response()->json($success, $this-> successStatus);
        }
        else{
            return response()->json(['error'=>'Unauthorised'], 401);
        }
    }
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);
        }
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken('MyApp')-> accessToken;
        $success['name'] =  $user->name;
        $success['email'] =  $user->email;
        $success['interested'] =json_decode($user->interested);

        return response()->json($success, $this-> successStatus);
    }
    /**
     * details api
     *
     * @return \Illuminate\Http\Response
     */
    public function details()
    {
        $user = Auth::user();
        return response()->json($user, $this-> successStatus);
    }

    public function update(Request $request){
        $user = Auth::user();

        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'password' => 'required',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            // Add other fields to be updated and their validation rules
        ]);


        // Update the user's information
        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];
        $user->password = Hash::make($validatedData['password']);
        // Save the updated user
        $user->save();

        $success['token'] =  $user->createToken('MyApp')-> accessToken;
        $success['name'] =  $user->name;
        $success['email'] =  $user->email;
        $success['interested'] =json_decode($user->interested);

        // Return a response
        return response()->json($success, $this-> successStatus);
    }

    public function updateInterested(Request $request){
        $user = Auth::user();

        // Validate the request data
        $validatedData = $request->validate([
            'dataSourceCheckboxItem' => 'required',
        ]);


        // Update the user's information
        $user->interested =json_encode($validatedData['dataSourceCheckboxItem']);
        $user->save();

        $success['token'] =  $user->createToken('MyApp')-> accessToken;
        $success['name'] =  $user->name;
        $success['email'] =  $user->email;
        $success['interested'] =json_decode($user->interested);

        // Return a response
        return response()->json($success, $this-> successStatus);
    }
}
