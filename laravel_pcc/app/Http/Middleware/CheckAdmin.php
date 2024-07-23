namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckAdmin
{
    public function handle($request, Closure $next)
    {
        if (Auth::check() && $request->user()->hasAdminRole()) {
            return $next($request);
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }
}