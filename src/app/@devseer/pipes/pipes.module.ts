import { CategoryPipe } from './category.pipe';
import { ChainPipe } from './chain.pipe';
import { NgModule } from '@angular/core';

import { KeysPipe } from './keys.pipe';
import { GetByIdPipe } from './getById.pipe';
import { HtmlToPlaintextPipe } from './htmlToPlaintext.pipe';
import { FilterPipe } from './filter.pipe';
import { CamelCaseToDashPipe } from './camelCaseToDash.pipe';
import { ChainCurrencyPipe } from './chain-currency.pipe';
import { SafePipe } from './safe.pipe';
import {CurrencyPipe} from './currency.pipe';
import { ShortNumberPipe } from './rounding-numbers.pipe';

@NgModule({
    declarations: [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        ChainPipe,
        CategoryPipe,
        ChainCurrencyPipe,
        SafePipe,
        CurrencyPipe,
        ShortNumberPipe
    ],
    imports     : [],
    exports     : [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        ChainPipe,
        CategoryPipe,
        ChainCurrencyPipe,
        SafePipe,
        CurrencyPipe,
        ShortNumberPipe
    ]
})
export class SeerPipesModule
{
}
