@extends('admin.layout.master')

@section('title', __('Work Schedule'))

@section('module', __('Number of Employees'))

@section('content')
<div class="m-portlet">
    <div class="m-portlet__body">
        <div class="m-section">
            <div class="m-section__content">
                <div class="m-portlet__head">
                    <div class="m-portlet__head-caption">
                        <div class="m-portlet__head-title">
                            <span class="m-portlet__head-icon">
                                <i class="flaticon-map-location"></i>
                            </span>
                            <h3 class="m-portlet__head-text">
                                {{ $location->name }}
                                -
                                @lang('Total Seat:', ['total' => $location->total_seat])
                            </h3>
                        </div>
                    </div>
                </div>
                <div class="m-portlet__body">
                    <div class="mb-4 text-right">
                        <span class="btn m-btn--pill btn-primary"></span> @lang('Number of seats left in the morning')
                        <span class="btn m-btn--pill btn-warning ml-5"></span> @lang('Number of seats left in the afternoon')
                    </div>
                    <div id="loading" class="text-center">
                        {!! Html::image(asset(config('site.static') . 'loading.gif'), null) !!}
                    </div>
                    <div id="m_calendar" data-url="{{ route('calendar.location.get_data', ['id' => $location->id]) }}"></div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('js')
<script src="{{ asset('js/calendar.js') }}"></script>
@endsection

@section('additional_body_class', 'm-brand--minimize m-aside-left--minimize')
