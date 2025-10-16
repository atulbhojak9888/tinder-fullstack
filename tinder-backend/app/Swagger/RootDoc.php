<?php
declare(strict_types=1);

namespace App\Swagger;

use OpenApi\Annotations as OA;

/**
 * @OA\OpenApi(
 *     @OA\Info(
 *         title="Tinder Clone API",
 *         version="1.0.0",
 *         description="Minimal OpenAPI spec to allow generation"
 *     ),
 *     @OA\Server(
 *         url="/api/v1",
 *         description="Local API"
 *     ),
 *     @OA\PathItem(
 *         path="/people",
 *         @OA\Get(
 *             tags={"People"},
 *             summary="List people",
 *             @OA\Response(response=200, description="OK")
 *         )
 *     )
 * )
 */
class RootDoc
{
    // Annotation holder only
}
