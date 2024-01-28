import { TopHolderPipe } from './top_holder/top-holder.pipe';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [
        TopHolderPipe
    ],
    exports: [
        TopHolderPipe
    ],
})
export class PipesModule
{
}
